import Button from '@/common/components/Button';
import { getSortingIcon } from '@/table/utilities/getSortingIcon';
import { Column } from '@/table/types/column';
import { ReactNode } from 'react';
import { VirtaulListProps } from '../types/virtualListProps';
import VirtualTable from './VirtualTable';
import TableRows from './TableRows';

interface TableProps extends VirtaulListProps {
  columns: Column[];
  isVirtual?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
}

const Table = ({
  rows,
  columns,
  height = 500,
  rowHeight = 40,
  renderAhead,
  header,
  footer,
  isVirtual,
}: TableProps) => (
  <div className="border-gray-300 border rounded-lg overflow-x-auto">
    <div className="sticky left-0">{header}</div>
    <table className="w-full min-w-[480px]">
      <tbody>
        <tr>
          <td>
            <table className="w-full">
              <thead>
                <tr className="border-b table w-full table-fixed">
                  {columns.map((cell) => (
                    <th
                      key={cell.id}
                      className="p-2 text-start"
                    >
                      <div className="flex items-center gap-2">
                        <span>{cell.value}</span>
                        {cell.sortingOrder && (
                          <span>
                            <Button
                              rounded
                              variant="text"
                              onClick={() => {}}
                            >
                              <span>{getSortingIcon(cell.sortingOrder)}</span>
                            </Button>
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
            </table>
          </td>
        </tr>
        <tr>
          <td>
            {isVirtual ? (
              <VirtualTable
                rows={rows}
                rowHeight={rowHeight}
                height={height}
                renderAhead={renderAhead}
              />
            ) : (
              <div
                className="overflow-auto"
                style={{ height }}
              >
                <table>
                  <tbody>
                    <TableRows rows={rows} />
                  </tbody>
                </table>
              </div>
            )}
          </td>
        </tr>
      </tbody>
    </table>
    <div className="sticky left-0">{footer}</div>
  </div>
);

export default Table;
