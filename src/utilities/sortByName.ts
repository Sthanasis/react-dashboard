import { SortingOrder } from '../table/enums/sortingOrder';
import { Row } from '../table/types/row';

const compare = (a: string | number, b: string | number) => {
  if (a > b) return 1;
  else if (a < b) return -1;
  return 0;
};

export function sortByName<T>(rows: Row<T>[], order: SortingOrder) {
  if (order === SortingOrder.default) return;
  return rows.sort((a, b) => {
    const compareA = a.items.find((item) => 'name' === item.name);
    const compareB = b.items.find((item) => 'name' === item.name);
    if (!compareA || !compareB) return 0;
    if (order === SortingOrder.asc)
      return compare(compareA.value, compareB.value);
    return compare(compareB.value, compareA.value);
  });
}
