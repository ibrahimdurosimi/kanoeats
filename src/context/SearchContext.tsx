import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

interface SearchContextValue {
  query: string;
  setQuery: (q: string) => void;
}

const SearchContext = createContext<SearchContextValue>({ query: '', setQuery: () => {} });

/**
 * Search lives above the routes because the input sits in the app shell while
 * the results render in the page below it.
 */
export function SearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('');
  const value = useMemo(() => ({ query, setQuery }), [query]);
  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export function useSearch(): SearchContextValue {
  return useContext(SearchContext);
}
