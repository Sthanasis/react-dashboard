import { SortingOrder } from '@/table/enums/sortingOrder';

export type Column<T = string> = {
  name: T;
  value: string;
  sortingOrder: SortingOrder;
};
