import { Row } from '@/table/types/row';

export type VirtaulListProps = {
  rows: Row[];
  height?: number;
  rowHeight?: number;
  renderAhead?: number;
};
