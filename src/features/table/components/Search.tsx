import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SearchProps {
  defaultValue?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const Search = ({ onChange, placeholder, defaultValue }: SearchProps) => {
  return (
    <label
      className="border rounded-md border-slate-gray border-opacity-70 hover:border-opacity-100 focus:border-opacity-100 flex items-center px-2"
      tabIndex={-1}
    >
      <FontAwesomeIcon icon={faSearch} />
      <input
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="p-2 border-solid focus:outline-none"
        type="text"
        name="text"
        aria-label="search"
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
};

export default Search;
