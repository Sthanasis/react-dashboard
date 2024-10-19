import { ApiResponse } from '@/types/apiResponse';

async function fetchAllCharacters(): Promise<ApiResponse> {
  const response = await fetch('https://api.disneyapi.dev/characters');
  const characters = await response.json();
  return characters.data;
}

export default { fetchAllCharacters };
