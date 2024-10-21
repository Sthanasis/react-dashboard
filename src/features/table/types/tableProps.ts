import { SortingOrder } from '../enums/sortingOrder';
import { Column } from './column';
import { Row } from './row';

export interface TableProps {
  rows: Row[];
  columns: Column[];
  height: number;
  rowHeight?: number;
  onSortByColumn: (order: SortingOrder, columnName: Column['name']) => void;
}
