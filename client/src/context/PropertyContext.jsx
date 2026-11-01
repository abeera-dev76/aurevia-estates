import { createContext, useContext, useState, useCallback } from 'react';

const PropertyContext = createContext(null);

export function PropertyProvider({ children }) {
  const [filters, setFilters] = useState({
    search: '', status: '', category: '', type: '',
    minPrice: '', maxPrice: '', bedrooms: '',
  });

  const updateFilter = useCallback((key, val) => {
    setFilters(prev => ({ ...prev, [key]: val }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ search: '', status: '', category: '', type: '', minPrice: '', maxPrice: '', bedrooms: '' });
  }, []);

  return (
    <PropertyContext.Provider value={{ filters, updateFilter, clearFilters }}>
      {children}
    </PropertyContext.Provider>
  );
}

export const usePropertyContext = () => useContext(PropertyContext);
