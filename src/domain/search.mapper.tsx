interface SearchInput {
    searchInput: string;
  }
  
  export const toSearchInput = (value: string): SearchInput => ({
    searchInput: value
  });
  