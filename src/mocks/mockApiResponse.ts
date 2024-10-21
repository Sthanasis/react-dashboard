import { ApiResponse } from '@/types/apiResponse';

export const MOCK_API_RESPONSE: ApiResponse = {
  info: { count: 1, nextPage: 'next', previousPage: 'previous', totalPages: 1 },
  data: Array.from(new Array(2)).map((_, i) => ({
    __v: i,
    _id: i,
    allies: [],
    createdAt: 'test',
    enemies: [],
    films: [],
    imageUrl: '',
    name: 'test name' + i,
    parkAttractions: [],
    shortFilms: [],
    sourceUrl: '',
    tvShows: [],
    updatedAt: '',
    url: '',
    videoGames: [],
  })),
};
