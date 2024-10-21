import { SortingOrder } from '@/table/enums/sortingOrder';
import { sortByName } from './sortByName';
import { MOCK_ROWS } from '@/mocks/mockRows';
describe('sortByName', () => {
  test('sort ascending', () => {
    const rows = [...MOCK_ROWS];
    sortByName(rows, SortingOrder.asc);
    expect(rows[0]).toBe(MOCK_ROWS[1]);
  });
  test('sort descending', () => {
    const rows = [...MOCK_ROWS];
    sortByName(rows, SortingOrder.desc);
    expect(rows[0]).toBe(MOCK_ROWS.at(-1));
  });
  test('sort default', () => {
    const rows = [...MOCK_ROWS];
    sortByName(rows, SortingOrder.default);
    expect(rows).toMatchObject(MOCK_ROWS);
  });
});
