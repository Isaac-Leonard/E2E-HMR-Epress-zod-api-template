const db = { count: 0 };

export const getCount = async () => db.count;

export const setCount = (count: number) => (db.count = count);
