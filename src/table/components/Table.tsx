import Button from '@/common/components/Button';
import { getSortingIcon } from '@/table/utilities/getSortingIcon';
import { Column } from '@/table/types/column';
import { Row } from '@/table/types/row';
import { ReactNode } from 'react';
import { useVirtualList } from '../hooks/useVirtualList';

interface TableProps {
  rows: Row[];
  columns: Column[];
  height?: number;
  header?: ReactNode;
  footer?: ReactNode;
  rowHeight?: number;
}

const Table = ({
  rows,
  columns,
  height = 500,
  rowHeight = 40,
  header,
  footer,
}: TableProps) => {
  const { handleScroll, offsetY, start, visibleNodeList } = useVirtualList({
    containerHeight: height,
    itemHeight: rowHeight,
    renderAhead: 20,
    totalItems: rows.length,
  });

  return (
    <div className="overflow-hidden border-gray-300 border rounded-lg">
      {header}
      <div
        className="h-full overflow-auto"
        style={{ height }}
        onScroll={(e) => handleScroll(e.currentTarget.scrollTop)}
      >
        <div
          className="relative"
          style={{ height: rows.length * rowHeight }}
        >
          <table
            className="w-full"
            style={{
              transform: `translate3d(0px,${offsetY}px,0px)`,
            }}
          >
            <thead>
              <tr className="border-b">
                {columns.map((cell) => (
                  <th
                    key={cell.name}
                    className="p-2 text-start whitespace-nowrap"
                  >
                    <div className="flex items-center gap-2">
                      <span>{cell.value}</span>
                      <Button
                        rounded
                        variant="text"
                        onClick={() => {}}
                      >
                        {getSortingIcon(cell.sortingOrder)}
                      </Button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleNodeList.map((_, i) => (
                <tr
                  key={rows[start + i].id}
                  className={[
                    'hover:bg-smokey-gray transition-colors',
                    i !== rows.length - 1 && 'border-b',
                  ].join(' ')}
                  role="button"
                  style={{ height: rowHeight ?? 'auto' }}
                >
                  {rows[start + i].items.map((cell) => (
                    <td
                      key={cell.name}
                      className="p-2 whitespace-nowrap"
                    >
                      {cell.value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {footer}
    </div>
  );
};

export default Table;
