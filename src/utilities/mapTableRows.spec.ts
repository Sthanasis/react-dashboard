import { MOCK_API_RESPONSE } from '@/mocks/mockApiResponse';
import { mapTableRows } from './mapTableRows';
import { columns } from '@/store/features/characters/charactersSlice';
describe('mapTableRows', () => {
  test('map', () => {
    const character = MOCK_API_RESPONSE.data[0];
    const result = mapTableRows([character], columns);
    expect(result).toMatchObject([
      {
        id: character._id,
        items: [
          { name: columns[0].id, value: character.name },
          { name: columns[1].id, value: character.tvShows.length },
          { name: columns[2].id, value: character.videoGames.length },
          { name: columns[3].id, value: '' },
          { name: columns[4].id, value: '' },
        ],
      },
    ]);
  });
});
