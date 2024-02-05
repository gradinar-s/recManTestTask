export const getLsData = (key: string) => {
  if (!key) return;

  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const setLsData = (key: string, data: any) => {
  if (!key) return;

  localStorage.setItem(key, JSON.stringify(data));
};
