function extractControlItems(vals) {
  const controlItems = [];
  const checkNorms = [];
  const executeNorms = [];
  let itemExisted = false;
  const keys = Object.keys(vals);
  console.log("keys", keys);

  keys.forEach(function(key) {
    console.log("key", key);
    if (key.startsWith("controlItem")) {
      itemExisted = true;
      controlItems.push({ id: key.split("controlItem")[1], name: vals[key] });
      delete vals[key];
    }
    if (key.startsWith("checkNorm")) {
      checkNorms.push({ id: key.split("checkNorm")[1], name: vals[key] });
      delete vals[key];
    }
    if (key.startsWith("executeNorm")) {
      executeNorms.push({ id: key.split("executeNorm")[1], name: vals[key] });
      delete vals[key];
    }
  });
  if (itemExisted) {
    vals.controlItem = JSON.stringify(controlItems);
    vals.controlCheckNorm = JSON.stringify(checkNorms);
    vals.controlExecuteNorm = JSON.stringify(executeNorms);
  }
  return vals;
}
export const extractValues = vals => {
  if (vals.checkPosition) {
    const [
      checkPrimaryPosition = null,
      checkSubPosition = null
    ] = vals.checkPosition;
    vals.checkPosition = checkPrimaryPosition;
    vals.checkSubPosition = checkSubPosition;
  }
  if (vals.executePosition) {
    const [
      executePrimaryPosition = null,
      executeSubPosition = null
    ] = vals.executePosition;
    vals.executePosition = executePrimaryPosition;
    vals.executeSubPosition = executeSubPosition;
  }
  vals = extractControlItems(vals);
  console.log("extracted", vals);

  return vals;
};
export const composeControlItems = (controlItems, checkItems, executeItems) => {
  if (!controlItems) {
    return [];
  }
  controlItems = JSON.parse(controlItems);
  checkItems = checkItems ? JSON.parse(checkItems) : [];
  executeItems = executeItems ? JSON.parse(executeItems) : [];
  const items = [];
  controlItems.forEach(item => {
    let tmp = {};
    tmp.id = item.id;
    tmp.name = item.name;
    tmp.checkNorm = (checkItems.find(c => c.id == item.id) || {}).name;
    tmp.executeNorm = (executeItems.find(e => e.id == item.id) || {}).name;
    items.push(tmp);
  });
  return items;
};
