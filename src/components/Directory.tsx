import { Accessor, For, Match, Show, Switch, createSignal } from "solid-js";
import File from "./File";
import { directory, file_structure } from "../types";

export default function Directory(props: {
  file: directory;
  toggle_folder: Function;
  changePath: Function;
}) {
  const { file, toggle_folder, changePath } = props;
  const { path, files, toggled } = file;
  const name = file.path.substring(file.path.lastIndexOf("\\") + 1);

  return (
    <div class="select-none">
      <div class="w-full h-6 flex align-center">
        <div
          onclick={() => {
            toggle_folder(file);
          }}
          class="bg-black text-white aspect-square flex items-center justify-center cursor-pointer"
        >
          {toggled() ? <>-</> : <>+</>}
        </div>
        <span
          onDblClick={(ev) => {
            changePath(path);
          }}
          class="h-full w-3/4 hover:bg-slate-200 rounded-md px-1"
        >
          {name}
        </span>
      </div>
      <Show when={toggled()}>
        <ul class="flex flex-col gap-0.5 pl-2 pt-1 h-fit relative before:bg-red-700 before:content-[''] before:absolute before:h-full before:top-0 before:left-0 before:w-0.5">
          <For each={files()}>
            {(file) => {
              switch (file.file_type) {
                case "directory":
                  return (
                    <Directory
                      file={file}
                      toggle_folder={toggle_folder}
                      changePath={changePath}
                    ></Directory>
                  );
                default:
                  return <File path={file.path}></File>;
              }
            }}
          </For>
        </ul>
      </Show>
    </div>
  );
}
