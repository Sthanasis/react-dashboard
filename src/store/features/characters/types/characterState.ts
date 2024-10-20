import { Filter } from '@/enums/Filter';
import { SortingOrder } from '@/table/enums/sortingOrder';
import { Column } from '@/table/types/column';
import { Row } from '@/table/types/row';
import { CharacterKey } from '@/types/character';
import { CharacterPreview } from '@/types/characterPreview';
import { DisneyCharacter } from '@/types/disneyCharacter';
import { FilterOption } from '@/store/features/characters/types/filterOption';
import { PaginationOptions } from './paginationOptions';

export interface CharactersState {
  data: DisneyCharacter[];
  search: string;
  loading: boolean;
  filterOptions: FilterOption[];
  activeFilter: Filter | null;
  characters: Row<CharacterKey>[];
  tableColumns: Column<CharacterKey>[];
  paginationOptions: PaginationOptions;
  order: SortingOrder;
  characterData: CharacterPreview | null;
  characterId: number | null;
}
