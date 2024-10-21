import { Filter } from '@/enums/Filter';
import service, { BASE_URL } from './charactersService';

describe('CharactersService', () => {
  test('fetch all', () => {
    const fetchSpy = vi.spyOn(window, 'fetch');
    service.fetchAllCharacters();
    expect(fetchSpy).toHaveBeenCalledWith(BASE_URL);
    expect(fetchSpy).toHaveBeenCalledOnce();
  });
  test('fetch with pagination', () => {
    const fetchSpy = vi.spyOn(window, 'fetch');
    const page = 1;
    const size = 2;
    const query = `?page=${page}&pageSize=${size}`;
    service.fetchAllCharactersByQuery(page, size);
    expect(fetchSpy).toHaveBeenCalledWith(BASE_URL + query);
  });
  test('fetch with search', () => {
    const fetchSpy = vi.spyOn(window, 'fetch');
    const page = 1;
    const size = 2;
    const search = { query: Filter.name, value: 'test' };
    const query = `?page=${page}&pageSize=${size}&${Filter.name}=${search.value}`;
    service.fetchAllCharactersByQuery(page, size, search);
    expect(fetchSpy).toHaveBeenCalledWith(BASE_URL + query);
  });
  test('fetch by character id', () => {
    const id = 1;
    const fetchSpy = vi.spyOn(window, 'fetch');
    service.fetchCharacterById(id);
    expect(fetchSpy).toHaveBeenCalledWith(BASE_URL + `/${id}`);
  });
});
