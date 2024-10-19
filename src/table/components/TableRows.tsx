import { Row } from '@/table/types/row';

const TableRows = ({
  rows,
  rowHeight,
}: {
  rows: Row[];
  rowHeight?: number;
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
      >
        {row.items.map((cell) => (
          <td
            key={cell.name}
            className="p-2 whitespace-nowrap"
          >
            {cell.value}
          </td>
        ))}
      </tr>
    ))}
  </>
);

export default TableRows;
