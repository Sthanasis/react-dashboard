import { Filter } from '@/enums/Filter';
import { SortingOrder } from '@/features/table/enums/sortingOrder';
import { CharacterPreview } from '@/types/characterPreview';
import { DisneyCharacter } from '@/types/disneyCharacter';
import { FilterOption } from '@/types/filterOption';
import { PaginationOptions } from '@/types/paginationOptions';

export interface CharactersState {
  data: DisneyCharacter[];
  search: string;
  loading: boolean;
  filterOptions: FilterOption[];
  activeFilter: Filter | null;
  paginationOptions: PaginationOptions;
  order: SortingOrder;
  characterData: CharacterPreview | null;
  characterId: number | null;
}
