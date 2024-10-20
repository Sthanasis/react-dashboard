import { Row } from '@/table/types/row';

const TableRows = ({
  rows,
  rowHeight,
  onSelectRow,
}: {
  rows: Row[];
  rowHeight?: number;
  onSelectRow?: (id: Row['id']) => void;
}) => (
  <>
    {rows.map((row, i) => (
      <tr
        key={row.id}
        className={[
          'hover:bg-smokey-gray transition-colors table w-full table-fixed',
          i !== rows.length - 1 && 'border-b',
        ].join(' ')}
        role="button"
        style={{ height: rowHeight ?? 'auto' }}
        onClick={() => onSelectRow?.(row.id)}
      >
        {row.items.map((cell) => (
          <td
            key={cell.name}
            className="p-2 whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {cell.value}
          </td>
        ))}
      </tr>
    ))}
  </>
);

export default TableRows;
