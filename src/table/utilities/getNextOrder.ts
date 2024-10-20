import { SortingOrder } from '@/table/enums/sortingOrder';

export function getNextOrder(order: SortingOrder) {
  return {
    [SortingOrder.default]: SortingOrder.asc,
    [SortingOrder.asc]: SortingOrder.desc,
    [SortingOrder.desc]: SortingOrder.default,
  }[order];
}
