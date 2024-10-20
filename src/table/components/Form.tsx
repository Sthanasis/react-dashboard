import Button from '@/common/components/Button';
import { Filter } from '@/enums/Filter';
import Search from '@/table/components/Search';
import { FilterOption } from '@/store/features/characters/types/filterOption';

interface FormProps {
  radioOptions: FilterOption[];
  selectedRadio: Filter | null;
  submitText: string;
  title: string;
  onCheck: (value: Filter | null) => void;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const Form = ({
  radioOptions,
  selectedRadio,
  submitText,
  title,
  onCheck,
  onChange,
  onSubmit,
}: FormProps) => {
  return (
    <form
      className="flex flex-col gap-2 p-2"
      onSubmit={(e) => e.preventDefault()}
    >
      <h1 className="text-lg font-bold">{title}</h1>
      <Search
        placeholder="Search"
        onChange={onChange}
      />

      <div className="flex items-center gap-4">
        {radioOptions.map((radio) => (
          <label
            key={radio.value}
            className="flex gap-2"
          >
            <input
              name="search"
              type="radio"
              checked={selectedRadio === radio.value}
              onChange={() => onCheck(radio.value)}
            />
            <span className="text-lg">{radio.label}</span>
          </label>
        ))}
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          variant="filled"
          color="primary"
          onClick={onSubmit}
        >
          {submitText}
        </Button>
      </div>
    </form>
  );
};

export default Form;
