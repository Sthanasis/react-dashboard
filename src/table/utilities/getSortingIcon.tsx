import SortAscIcon from '@/common/icons/SortAscIcon';
import SortDescIcon from '@/common/icons/SortDescIcon';
import { SortingOrder } from '@/table/enums/sortingOrder';
import SortIcon from '@/common/icons/SortIcon';

export function getSortingIcon(order: SortingOrder) {
  return {
    [SortingOrder.asc]: <SortAscIcon />,
    [SortingOrder.desc]: <SortDescIcon />,
    [SortingOrder.default]: <SortIcon />,
  }[order];
}
