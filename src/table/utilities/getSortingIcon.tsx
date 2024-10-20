import { SortingOrder } from '@/table/enums/sortingOrder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSort,
  faSortAsc,
  faSortDesc,
} from '@fortawesome/free-solid-svg-icons';

export function getSortingIcon(order: SortingOrder) {
  return {
    [SortingOrder.asc]: (
      <FontAwesomeIcon
        width={24}
        height={24}
        icon={faSortAsc}
      />
    ),
    [SortingOrder.desc]: (
      <FontAwesomeIcon
        width={24}
        height={24}
        icon={faSortDesc}
      />
    ),
    [SortingOrder.default]: (
      <FontAwesomeIcon
        width={24}
        height={24}
        icon={faSort}
      />
    ),
  }[order];
}
