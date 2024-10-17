import { RowItem } from '@/table/types/rowItem';

export type Row<T = string> = {
  id: number;
  items: RowItem<T>[];
};
