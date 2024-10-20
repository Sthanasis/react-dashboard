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
  const startIndicator = pageSize * (page - 1) + 1;
  let endIndicator = pageSize * page;
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
          disabled={page === 1}
          onClick={() => onPageChange(1)}
        >
          <FontAwesomeIcon
            icon={faAnglesLeft}
            height="16"
            width="16"
          />
        </Button>
        <Button
          variant="text"
          rounded
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          <FontAwesomeIcon
            icon={faAngleLeft}
            height="16"
            width="16"
          />
        </Button>
        <Button
          variant="text"
          rounded
          disabled={endIndicator === total}
          onClick={() => onPageChange(page + 1)}
        >
          <FontAwesomeIcon
            icon={faAngleRight}
            height="16"
            width="16"
          />
        </Button>
        <Button
          variant="text"
          rounded
          disabled={endIndicator === total}
          onClick={() => onPageChange(Math.ceil(total / pageSize))}
        >
          <FontAwesomeIcon
            icon={faAnglesRight}
            height="16"
            width="16"
          />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
