import Button from '@/common/components/Button';
import PopoverMenu from '@/common/components/PopoverMenu';
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface PaginationProps {
  page: number;
  pageSize: number;
  rowsPerPageOptions: number[];
  total: number;
  label: string;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
}

const Pagination = ({
  page,
  pageSize,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions,
  total,
  label,
}: PaginationProps) => {
  const startIndicator = pageSize * page + 1;
  let endIndicator = pageSize * (page + 1);
  endIndicator = total < endIndicator ? total : endIndicator;
  const pageIndicator = `${startIndicator} - ${endIndicator} / ${total}`;
  return (
    <div className="flex justify-center items-center flex-wrap md:justify-end gap-3 px-4 py-2 border-t">
      <div className="flex items-center gap-2">
        <span>{label}</span>
        <PopoverMenu
          label={pageSize.toString()}
          options={rowsPerPageOptions}
          onChange={(rowsPerPage) => onRowsPerPageChange(Number(rowsPerPage))}
        />
      </div>
      <span>{pageIndicator}</span>
      <div className="flex">
        <Button
          variant="text"
          rounded
          disabled={page === 0}
          onClick={() => onPageChange(1)}
        >
          <FontAwesomeIcon icon={faAnglesLeft} />
        </Button>
        <Button
          variant="text"
          rounded
          disabled={page === 0}
          onClick={() => onPageChange(page - 1)}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </Button>
        <Button
          variant="text"
          rounded
          disabled={endIndicator === total}
          onClick={() => onPageChange(page + 1)}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </Button>
        <Button
          variant="text"
          rounded
          disabled={endIndicator === total}
          onClick={() => onPageChange(Math.floor(total / pageSize))}
        >
          <FontAwesomeIcon icon={faAnglesRight} />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
