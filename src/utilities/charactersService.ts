import { ApiResponse } from '@/types/apiResponse';

const BASE_URL = 'https://api.disneyapi.dev/character';

async function fetchAllCharacters(): Promise<ApiResponse> {
  const response = await fetch(BASE_URL);
  const characters = await response.json();
  return characters;
}
async function fetchAllPaginatedCharacters(
  page: number,
  pageSize: number
): Promise<ApiResponse> {
  console.log(page, pageSize);
  const response = await fetch(`${BASE_URL}?page=${page}&pageSize=${pageSize}`);
  const characters = await response.json();
  return characters;
}

export default { fetchAllCharacters, fetchAllPaginatedCharacters };
