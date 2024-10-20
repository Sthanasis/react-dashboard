import { Filter } from '@/enums/Filter';
import { ApiResponse } from '@/types/apiResponse';

const BASE_URL = 'https://api.disneyapi.dev/character';

async function fetchAllCharacters(): Promise<ApiResponse> {
  const response = await fetch(BASE_URL);
  return await response.json();
}

async function fetchAllCharactersByQuery(
  page: number,
  pageSize: number,
  search?: { query?: Filter; value?: string }
): Promise<ApiResponse> {
  let query = `?page=${page}&pageSize=${pageSize}`;
  if (!!search && search.query && search.value)
    query = query.concat(`&${search.query}=${search.value}`);
  const response = await fetch(`${BASE_URL}${query}`);
  return await response.json();
}

async function fetchCharacterById(id: number) {
  const response = await fetch(`${BASE_URL}/${id}`);
  return await response.json();
}

export default {
  fetchAllCharacters,
  fetchAllCharactersByQuery,
  fetchCharacterById,
};
