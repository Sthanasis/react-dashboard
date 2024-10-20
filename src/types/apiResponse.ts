import { DisneyCharacter } from '@/types/disneyCharacter';
import { ApiPaginationInfo } from '@/types/apiPaginationInfo';

export type ApiResponse<T = DisneyCharacter[]> = {
  info: ApiPaginationInfo;
  data: T;
};
