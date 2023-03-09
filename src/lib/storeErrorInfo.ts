export const createRecordError: { [key: string]: string } = {
  null: '记账成功'
};
export const createCategoryError: { [key: string]: string } = {
  null: '添加类别成功',
  'category name is duplicated': '类别名重复',
  'category id is duplicated': '重复创建',
};
export const updateCategoryError: { [key: string]: string } = {
  null: '更新类别成功',
  'category is nut found': '找不到该类别信息',
};
