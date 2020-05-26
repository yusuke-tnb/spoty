exports.renameId = (nameId, data) => {
  const tmp = data.toObject();
  tmp[nameId] = tmp._id;
  delete tmp._id;
  return tmp;
}
