function changeIdOfObject(object) {
  const newObject = object;
  newObject.id = newObject._id;
  delete newObject._id;
  return newObject;
}

module.exports.changeIdOfObject = changeIdOfObject;
