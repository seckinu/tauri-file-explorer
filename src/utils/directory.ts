import { invoke } from "@tauri-apps/api";
import { file_structure } from "../types";

export function get_upper_directory(dir: string) {
  return dir.split("/").slice(0, -1).join("/");
}

export async function fetch_directory(path: string) {
  const x = await invoke<file_structure[]>("get_directory", {
    path: path,
  });

  return x;
}

export async function fetch_file_info(path: string) {
  const x = await invoke<file_structure>("get_file_info", {
    path: path,
  });

  return x;
}

export function get_file_name(path: string) {
  return path.substring(path.lastIndexOf("\\") + 1);
}

export function double_click_file(ev: MouseEvent, file: file_structure) {
  switch (file.type) {
    case "file":
      invoke("dbl_click_file", {
        path: file.path,
      });
      break;
    case "symlink":
      break;
    default:
      break;
  }
}

export async function fetch_folder_contents(path: string) {
  const x = await invoke<file_structure[]>("get_directory", {
    path: path,
  });
}
