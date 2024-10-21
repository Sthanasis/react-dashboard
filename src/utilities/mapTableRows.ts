import { DisneyCharacter } from '@/types/disneyCharacter';
import { Column } from '../table/types/column';
import { CharacterKey } from '@/types/character';

export function mapTableRows(
  data: DisneyCharacter[],
  columns: Column<CharacterKey>[]
) {
  return data
    .map((character) => ({
      id: character._id,
      name: character.name,
      participatingShows: character.tvShows.length,
      participatingVideoGames: character.videoGames.length,
      allies: character.allies.join(', '),
      enemies: character.enemies.join(', '),
    }))
    .map((item) => ({
      id: item.id,
      items: columns.map((column) => ({
        name: column.id,
        value: item[column.id],
      })),
    }));
}
