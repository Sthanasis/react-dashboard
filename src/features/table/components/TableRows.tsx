import { Row } from '@/features/table/types/row';

const TableRows = ({
  rows,
  rowHeight,
  onSelectRow,
}: {
  rows: Row[];
  rowHeight?: number;
  onSelectRow?: (id: Row['id']) => void;
}) => (
  <tbody
    onClick={(e) => {
      const target = e.target as HTMLTableElement;
      if (!target.matches('td')) return;
      const cell = e.target as HTMLTableCellElement;
      const id = Number(cell.getAttribute('data-id'));
      onSelectRow?.(id);
    }}
  >
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
            data-id={row.id}
            className="p-2 whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {cell.value}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
);

export default TableRows;
