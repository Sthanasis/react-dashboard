import { useVirtualList } from '@/table/hooks/useVirtualList';
import { VirtaulListProps } from '@/table/types/virtualListProps';
import { useMemo } from 'react';
import TableRows from './TableRows';

const VirtualTable = ({
  rows,
  height = 500,
  rowHeight = 40,
  renderAhead = 20,
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
          <tbody>
            <TableRows
              rows={renderedRows}
              rowHeight={rowHeight}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VirtualTable;
