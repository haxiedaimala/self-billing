const files = require.context('@/assets/icons/original/tags', true, /.svg$/);

const getIconName: string[] = [];
files.keys().forEach(file => {
  getIconName.push(file.slice(2, -4));
});
export default getIconName;