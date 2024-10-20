import { ApiResponse } from '@/types/apiResponse';

const BASE_URL = 'https://api.disneyapi.dev/character';

async function fetchAllCharacters(): Promise<ApiResponse> {
  const response = await fetch(BASE_URL);
  const characters = await response.json();
  return characters;
}
async function fetchAllCharactersByQuery(
  page: number,
  pageSize: number,
  search?: string
): Promise<ApiResponse> {
  let query = `?page=${page}&pageSize=${pageSize}`;
  if (!!search) query = query.concat(`&name=${search}`);
  const response = await fetch(`${BASE_URL}${query}`);
  const characters = await response.json();
  return characters;
}

export default {
  fetchAllCharacters,
  fetchAllCharactersByQuery,
};
