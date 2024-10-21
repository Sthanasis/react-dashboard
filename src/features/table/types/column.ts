import { SortingOrder } from '@/features/table/enums/sortingOrder';

export type Column<T = string> = {
  id: T;
  value: string;
  sortingOrder?: SortingOrder;
};
