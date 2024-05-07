export const normal_comp = (a,b) => 0;

export const name_comp = (a, b) => {
  if (!a || !b) {
    return 0;
  }
  // return a.name < b.name
    if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
}
export const date_comp = (a, b) => {
  if (!a.date) {
    return 1;
  } else if (!b.date) {
    return -1
  } else {
    return a.date > b.date
  }
}

export const prio_comp = (a, b) => {
  if (a.priority == "") {
    return 1;
  } else if (b.priority == "") {
    return -1;
  }
  return prioMap(a) > prioMap(b);
}

function prioMap(prioStr) {
  switch (prioStr.priority.toLowerCase()) {
    case "high priority":
      return 3;
    case "medium priority":
      return 2;
    case "low priority":
      return 1;
    default:
      return 0;
  }
}