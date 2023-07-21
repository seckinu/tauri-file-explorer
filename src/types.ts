import { createSignal, type Accessor, type Setter } from "solid-js";
import { fetch_directory } from "./utils/directory";

type file = {
  file_type: "file";
} & file_path;

type symlink = {
  file_type: "symlink";
  linked_path: string;
} & file_path;

export type directory = {
  file_type: "directory";
  toggled: Accessor<boolean>;
  files: Accessor<file_structure[]>;
  setFiles: Setter<file_structure[]>;
  setToggled: Setter<boolean>;
} & file_path;

type file_path = {
  path: string;
};

export type file_structure = directory | file | symlink;
