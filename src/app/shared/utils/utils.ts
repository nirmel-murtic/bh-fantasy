
export function removeItem(array, value) {
  const index = array.indexOf(value);

  if(index !== -1) {
    array.splice(index, 1);
  }
}

export function addIfNotExist(array, value): boolean {
  if(array.indexOf(value) === -1) {
    array.push(value);

    return true;
  }

  return false;
}
