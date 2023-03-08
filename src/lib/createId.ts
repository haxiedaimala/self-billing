let id = parseInt(localStorage.getItem('_idMax') || '0') || 0;
const createId = () => {
  id++;
  localStorage.setItem('_idMax', JSON.stringify(id));
  return id;
};
export default createId;