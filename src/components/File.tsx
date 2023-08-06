import { file_structure } from "../types";
import { double_click_file } from "../utils/directory";

type FileProps = {
  file: file_structure;
};

export default function File(props: FileProps) {
  const { file } = props;

  const name = file.path.substring(file.path.lastIndexOf("\\") + 1);

  return (
    <div
      ondblclick={(e) => double_click_file(e, file)}
      class="relative select-none hover:bg-slate-400 left-0 right-0 mr-2 rounded-sm px-1"
    >
      <span>{name}</span>
    </div>
  );
}
