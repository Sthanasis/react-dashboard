import { Row } from '@/table/types/row';

export interface TableRowsProps {
  rows: Row[];
  rowHeight?: number;
  onSelectRow?: (id: Row['id']) => void;
}
