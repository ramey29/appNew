const localStorage = window.localStorage;

export const get = itemName => localStorage.getItem(itemName);

export const getStoreCollection = itemName => JSON.parse(getStoreItem(itemName));

export const set = (itemName, data) => {
    localStorage.setItem(itemName, data);
};

export const setStoreCollection = (itemName, data) => {
    setStoreItem(itemName, JSON.stringify(data));
};

export const removeStoreItem = itemName => {
    localStorage.removeItem(itemName);
};

export const clearStore = () => {
    localStorage.clear();
};
