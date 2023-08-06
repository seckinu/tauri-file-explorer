import { For, Match, Switch, createResource } from "solid-js";
import { fetch_directory } from "../utils/directory";
import File from "./File";
import Directory from "./Directory";

export default function FolderContents(props: { path: string }) {
  const [contents] = createResource(
    () => props.path,
    async () => {
      return (await fetch_directory(props.path)).sort((a, b) => {
        if (a.type === "directory" && b.type !== "directory") {
          return -1;
        }

        if (a.type !== "directory" && b.type === "directory") {
          return 1;
        }

        if (a.path < b.path) {
          return -1;
        }

        return 0;
      });
    }
  );

  return (
    <>
      <Switch>
        <Match when={contents.loading}>
          <div>Loading...</div>
        </Match>
        <Match when={contents.error}>
          <div>Error: {contents.error}</div>
        </Match>
        <Match when={contents()}>
          <For each={contents()}>
            {(content) => (
              <Switch>
                <Match when={content.type === "directory"}>
                  <Directory file={content} />
                </Match>
                <Match when={content.type}>
                  <File file={content} />
                </Match>
              </Switch>
            )}
          </For>
        </Match>
      </Switch>
    </>
  );
}
