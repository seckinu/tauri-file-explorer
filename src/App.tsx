import { Accessor, Setter, Show, createResource, createSignal } from "solid-js";

import { createStore } from "solid-js/store";
import "./App.css";
import Directory from "./components/Directory";
import type { directory, file_structure } from "./types";
import { get_directories, fetch_directory } from "./utils/directory";

function App() {
  const [path, setPath] = createSignal(window.start_path);

  const [mainDirectory, setMainDirectory] = createStore<directory>(
    {} as directory
  );
  const [fileFetcher] = createResource(
    path,
    async () => {
      const dir = (await fetch_directory(path())) as directory;
      dir.setToggled(true);

      return dir;
    },
    {
      storage: () => [
        (() => mainDirectory) as Accessor<directory | undefined>,
        setMainDirectory as Setter<directory | undefined>,
      ],
    }
  );

  async function toggle_folder(file: file_structure) {
    if (file.file_type !== "directory") return;

    const updated_directory = (await fetch_directory(file.path)) as directory;
    file.setFiles(updated_directory.files());

    file.setToggled((prev) => !prev);
  }

  function changePath(path: string) {
    setPath(path);
  }

  function goUpDirectory() {
    setPath(path().substring(0, path().lastIndexOf("\\")));
  }

  return (
    <div>
      <button onclick={goUpDirectory}>back</button>
      <h1>Files</h1>
      <br />

      <div class="ml-1">
        <Show when={!fileFetcher.loading}>
          <Directory
            file={mainDirectory}
            toggle_folder={toggle_folder}
            changePath={changePath}
          />
        </Show>
      </div>
    </div>
  );
}

export default App;
