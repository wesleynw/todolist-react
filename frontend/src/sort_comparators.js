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
    if (a.date > b.date) {
      return 1;
    } else {
      return -1;
    }
  }
}

export const prio_comp = (a, b) => {
  if (!a || !a.priority || a.priority == "") {
    return 1;
  } else if (!b | b.priority == "") {
    return -1;
  }

  if (prioMap(a) > prioMap(b)) {
    return -1;
  } else {
    return 1;
  }
}

function prioMap(prioStr) {
  switch (prioStr.priority.toLowerCase()) {
    case "high":
      return 3;
    case "medium":
      return 2;
    case "low":
      return 1;
    default:
      return 0;
  }
}