import { ApiResponse } from '@/types/apiResponse';

const BASE_URL = 'https://api.disneyapi.dev/character';

async function fetchAllCharacters(): Promise<ApiResponse> {
  const response = await fetch(BASE_URL);
  return await response.json();
}
async function fetchAllCharactersByQuery(
  page: number,
  pageSize: number,
  search?: string
): Promise<ApiResponse> {
  let query = `?page=${page}&pageSize=${pageSize}`;
  if (!!search) query = query.concat(`&name=${search}`);
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
