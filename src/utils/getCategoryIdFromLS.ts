export const getCategoryIdFromLS = () => {
  const data = localStorage.getItem('categoryId');
  const categoryId = data ? JSON.parse(data) : 0;
  return categoryId as number;
};
