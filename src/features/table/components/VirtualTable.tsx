import { useVirtualList } from '@/features/table/hooks/useVirtualList';
import { VirtaulListProps } from '@/features/table/types/virtualListProps';
import { useMemo } from 'react';
import TableRows from './TableRows';

const VirtualTable = ({
  rows,
  height = 500,
  rowHeight = 40,
  renderAhead = 20,
  onSelectRow,
}: VirtaulListProps) => {
  const { handleScroll, offsetY, start, visibleNodeList } = useVirtualList({
    containerHeight: height,
    itemHeight: rowHeight,
    renderAhead: renderAhead,
    totalItems: rows.length,
  });

  const renderedRows = useMemo(
    () => visibleNodeList.map((_, i) => rows[start + i]),
    [start, visibleNodeList, rows]
  );

  return (
    <div
      className="overflow-auto"
      style={{ height }}
      onScroll={(e) => handleScroll(e.currentTarget.scrollTop)}
    >
      <div style={{ height: rows.length * rowHeight }}>
        <table
          className="w-full"
          style={{
            transform: `translate3d(0px,${offsetY}px,0px)`,
          }}
        >
          <TableRows
            rows={renderedRows}
            rowHeight={rowHeight}
            onSelectRow={onSelectRow}
          />
        </table>
      </div>
    </div>
  );
};

export default VirtualTable;
