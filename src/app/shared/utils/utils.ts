import {Id} from "../models/id";

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

export function detectTouch() {
  return 'ontouchstart' in document.documentElement;
}

export function handleApiError(error, router) {
  if(error.status === 404) {
    router.navigateByUrl('/page-not-found', {skipLocationChange: true});
  } else {
    router.navigateByUrl('/maintenance', {skipLocationChange: true});
  }
}

export function updateModelInModels(models: Id[], model: Id) {
  if (!models) {
    return [model];
  }

  const newModels = [];

  let updated = false;

  models.forEach(value => {
    if (value.id === model.id) {
      newModels.push(model);

      updated = true;
    } else {
      newModels.push(value);
    }
  });

  if (!updated) {
    newModels.push(model);
  }

  return newModels;
}
