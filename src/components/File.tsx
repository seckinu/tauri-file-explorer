type FileProps = {
  path: string;
};

export default function (props: FileProps) {
  const { path } = props;
  const name = path.substring(path.lastIndexOf("\\") + 1);

  return (
    <div>
      <span> {name} </span>
    </div>
  );
}
