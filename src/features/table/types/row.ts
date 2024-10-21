import { RowItem } from '@/features/table/types/rowItem';

export type Row<T = string> = {
  id: number;
  items: RowItem<T>[];
};
