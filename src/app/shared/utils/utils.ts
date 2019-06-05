import {Id} from "../models/id";
import {NavigationExtras} from "@angular/router";

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

export function handleApiError(response, router, showError=false) {
  if(response.status === 404) {
    router.navigateByUrl('/page-not-found', {skipLocationChange: true});
  } else {
    if(showError) {
      sessionStorage.error = response.error.message;
    } else {
      delete sessionStorage.error;
    }

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
