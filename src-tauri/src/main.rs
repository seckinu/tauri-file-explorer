// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{collections::HashMap, fs};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn change_directory(path: std::path::PathBuf) -> String {
    std::env::set_current_dir(path).unwrap();
    return std::env::current_dir().unwrap().display().to_string();
}

#[tauri::command]
fn get_directory(path: Option<String>) -> Vec<HashMap<String, String>> {
    let dir_content =
        fs::read_dir(path.unwrap_or(".".to_string())).unwrap_or(fs::read_dir(".").unwrap());

    let mut content = Vec::new();

    for c in dir_content {
        let file = c.unwrap();

        let mut file_info: HashMap<String, String> = HashMap::new();
        file_info.insert("path".to_string(), file.path().display().to_string());
        file_info.insert(
            "type".to_string(),
            match file.file_type().unwrap().is_dir() {
                true => "directory".to_string(),
                false => match file.file_type().unwrap().is_symlink() {
                    true => "symlink".to_string(),
                    false => "file".to_string(),
                },
            },
        );

        content.push(file_info);
    }
    return content;
}

#[tauri::command]
fn get_file_info(path: &str) -> Result<HashMap<String, String>, ()> {
    let file_result = fs::metadata(path);
    match file_result {
        Ok(file) => {
            let mut file_info: HashMap<String, String> = HashMap::new();
            file_info.insert(
                "type".to_string(),
                match file.file_type().is_dir() {
                    true => "directory".to_string(),
                    false => match file.file_type().is_symlink() {
                        true => "symlink".to_string(),
                        false => "file".to_string(),
                    },
                },
            );

            file_info.insert("path".to_string(), path.to_string());

            return Ok(file_info);
        }
        Err(_) => Err(()),
    }
}

#[tauri::command]
fn dbl_click_file(path: &str) -> Result<(), ()> {
    std::process::Command::new("cmd")
        .args(["/C", "start", path])
        .spawn()
        .expect("failed to execute process");

    Ok(())
}

fn main() {
    println!("{}", std::env::current_dir().unwrap().display());
    tauri::Builder::default()
        .on_page_load(|window, _| {
            let start_path = std::env::current_dir()
                .unwrap()
                .display()
                .to_string()
                .escape_default()
                .to_string();
            let _ = window.eval(&format!(r"start_path='{}'", start_path));
        })
        .invoke_handler(tauri::generate_handler![
            greet,
            change_directory,
            get_directory,
            get_file_info,
            dbl_click_file
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
