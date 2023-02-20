import { toSearchInput } from "../domain/search.mapper";
import { getSearchResults } from "../domain/search.repository";

export const submitSearch = async (value: string) => {
  const input = toSearchInput(value);
  const results = await getSearchResults(input.searchInput);
};
