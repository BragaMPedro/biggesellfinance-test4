import React, { createContext, useCallback, useContext, useState } from 'react';
const DataContext = createContext();

/**
 * @typedef {object} Item
 * @property {number} id - Unique identifier.
 * @property {string} name - Items name.
 * @property {string} category - Items category.
 * @property {number} price - Items price.
 */

export function DataProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = useCallback(async (params = { q, limit }) => {
    setLoading(true)
    try {
      const paramsString = new URLSearchParams(params).toString()
      const res = await fetch(`http://localhost:3001/api/items?${paramsString}`);
      const json = await res.json();

      if (!res.ok) {
        throw new Error();
      }

      setItems(json);
    } catch (error) {
      console.error("Fetch unsucessful:", error);
    }

    setLoading(false)
  }, []);

  const value = { items, fetchItems, loading }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);