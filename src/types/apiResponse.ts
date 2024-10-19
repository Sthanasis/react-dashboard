import { DisneyCharacter } from '@/types/disneyCharacter';
import { ApiPaginationInfo } from '@/types/apiPaginationInfo';

export type ApiResponse = {
  info: ApiPaginationInfo;
  data: DisneyCharacter[];
};
