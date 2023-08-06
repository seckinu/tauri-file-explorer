import { Show, createEffect, createSignal } from "solid-js";
import FolderContents from "./FolderContents";
import { useNavigate, useParams } from "@solidjs/router";
import { get_upper_directory } from "../utils/directory";

export default function FileViewer() {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <div class="ml-1">
      <p>{params.path}</p>
      <Show when={params.path}>
        <div
          ondblclick={() => {
            navigate(get_upper_directory(params.path));
          }}
          class="relative select-none hover:bg-slate-400 left-0 right-0 mr-2 rounded-sm px-1"
        >
          ..
        </div>
        <FolderContents path={params.path} />
      </Show>
    </div>
  );
}
