export type file = {
  type: "file";
} & file_path;

export type symlink = {
  type: "symlink";
  linked_path: string;
} & file_path;

export type directory = {
  type: "directory";
} & file_path;

type file_path = {
  path: string;
};

export type file_structure = directory | file | symlink;
