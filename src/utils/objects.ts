// Helper function to deep copy an object
function deepCopyObj(obj: Object) {
  return JSON.parse(JSON.stringify(obj));
}

// Main function
export function updateFilesValue(
  obj: file_structure,
  searchPath: string,
  newFiles: file_structure[] | undefined
) {
  // Deep copy the object to prevent mutations
  let newObj = deepCopyObj(obj);

  if (newFiles === undefined) {
    return newObj;
  }

  // Internal recursive function for traversal
  function recursiveUpdate(tempObj: file_structure) {
    if (!tempObj) return;

    if (tempObj.path === searchPath) {
      tempObj.files = newFiles;
      tempObj.toggled = !tempObj.toggled;
      return;
    }
    if (tempObj.file_type === "directory" && tempObj.files) {
      for (let i = 0; i < tempObj.files.length; i++) {
        recursiveUpdate(tempObj.files[i]);
      }
    }
  }

  // Start the recursion
  recursiveUpdate(newObj);

  // Return the updated copy
  return newObj;
}

function findAndUpdate(
  obj: file_structure,
  searchPath: string,
  newFiles: file_structure[] | undefined
) {
  // Deep copy the object to prevent mutations
  let newObj = deepCopyObj(obj);

  // Internal recursive function for traversal
  function recursiveUpdate(tempObj: file_structure): file_structure | null {
    if (!tempObj) return null;

    if (tempObj.path === searchPath) {
      tempObj.files = newFiles; // Update found object
      return tempObj; // Return modified object
    }

    // If it's a directory, we continue the recursion
    if (tempObj.file_type === "directory") {
      for (let i = 0; i < tempObj.files.length; i++) {
        const found = recursiveUpdate(tempObj.files[i]);
        if (found) return found; // If a match was found in the recursion tree, it's returned here
      }
    }

    // If no match was found in this recursion tree, return null
    return null;
  }

  // Start the recursion and return the result
  return recursiveUpdate(newObj);
}
