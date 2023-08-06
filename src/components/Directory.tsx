import { For, Show, createSignal } from "solid-js";
import File from "./File";
import { file_structure } from "../types";
import FolderContents from "./FolderContents";
import { useNavigate } from "@solidjs/router";

export default function Directory(props: { file: file_structure }) {
  const { file } = props;
  const { path } = file;
  const name = file.path.substring(file.path.lastIndexOf("\\") + 1);

  const navigate = useNavigate();

  const [toggled, setToggled] = createSignal(false);

  return (
    <div
      ondblclick={() => navigate(path)}
      class="relative select-none overflow-hidden left-0 right-0 mr-2 rounded-sm px-1"
    >
      <div class="hover:bg-slate-400">
        <span> {name} </span>
        <button onClick={() => setToggled(!toggled())}>
          {" "}
          {toggled() ? "−" : "+"}{" "}
        </button>
      </div>

      <Show when={toggled()}>
        <div class="ml-4 before:content-[''] before:bg-black before:w-1  before:left-1 before:bottom-1 before:top-6 before:absolute">
          <FolderContents path={file.path} />
        </div>
      </Show>
    </div>
  );
}
