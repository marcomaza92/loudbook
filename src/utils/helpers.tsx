export const parseData = (audiobook) => audiobook.items.map((item, index) => {
  const locale = 'es-MX';
  const keys = Object.keys(item.fields);
  let newItem = {};
  for (let i = 0; i < keys.length; i++) {
    if (Object.prototype.hasOwnProperty.call(item.fields, keys[i])) {
      const value = item.fields[keys[i]][locale];
      newItem = Object.assign(newItem, {
        id: item.sys.id,
        version: item.sys.version,
        [keys[i]]: value
      })
    }
  }
  return newItem;
});