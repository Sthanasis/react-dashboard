import { TableRowsProps } from '@/table/types/tableRowProps';

export interface VirtaulListProps extends TableRowsProps {
  height?: number;
  rowHeight?: number;
  renderAhead?: number;
}
