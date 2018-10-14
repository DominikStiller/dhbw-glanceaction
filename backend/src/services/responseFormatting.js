/**
 * Formats the ID value of a JSON object for returning it in a response
 * @param {Object} object - The object of which to change the ID value.
 */
function changeIdOfObject(object) {
  const newObject = object;
  newObject.id = newObject._id;
  delete newObject._id;
  return newObject;
}

module.exports.changeIdOfObject = changeIdOfObject;
