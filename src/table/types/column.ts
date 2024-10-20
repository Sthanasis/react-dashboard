import { SortingOrder } from '@/table/enums/sortingOrder';

export type Column<T = string> = {
  id: T;
  value: string;
  sortingOrder: SortingOrder;
};
