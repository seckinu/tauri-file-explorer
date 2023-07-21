import { invoke } from "@tauri-apps/api";
import { directory, file_structure } from "../types";
import { createSignal } from "solid-js";

export async function fetch_directory(path: string) {
  const x = await invoke<file_structure[]>("get_directory", {
    path: path,
  });

  x.forEach((element) => {
    if (element.file_type === "directory") {
      const [files, setFiles] = createSignal<file_structure[]>([]);
      const [toggled, setToggled] = createSignal<boolean>(false);

      element.files = files;
      element.setFiles = setFiles;
      element.toggled = toggled;
      element.setToggled = setToggled;
    }
  });

  const [files, setFiles] = createSignal<file_structure[]>(x);
  const [isToggled, setIsToggled] = createSignal<boolean>(false);

  const final = {
    file_type: "directory",
    path: path,
    files: files,
    toggled: isToggled,
    setToggled: setIsToggled,
    setFiles: setFiles,
  } as file_structure;

  return final;
}

export function get_directories(path: string, start?: string) {
  const directories: string[] = [];

  while (path.indexOf("\\") !== -1) {
    if (start && path === start) break;

    path = path.substring(0, path.lastIndexOf("\\"));
    directories.push(path);
  }

  return directories.reverse();
}
