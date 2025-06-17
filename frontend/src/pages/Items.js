import React, { useState, useEffect } from 'react';
import { useData } from '../state/DataContext';
import { Link } from 'react-router-dom';

function Items() {
  const { items, fetchItems, loading } = useData();
   const [limit, setLimit] = useState(20);
   const [q, setQ] = useState('');

  useEffect(() => {
    let active = true;

    active && fetchItems({q, limit}).catch(console.error);

    return () => {
      active = false;
    };
  }, [fetchItems]);

  if (loading) return <p>Loading...</p>;

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <Link to={'/items/' + item.id}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default Items;