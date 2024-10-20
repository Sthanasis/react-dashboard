import { MouseEvent, useState } from 'react';
import Button from '@/common/components/Button';

const PopoverMenu = ({
  label,
  direction = 'top',
  options,
  onChange,
}: {
  label: string;
  direction?: 'top' | 'bottom';
  options: string[] | number[];
  onChange: (v: string) => void;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const classList = [
    'absolute w-full bg-snow-white shadow flex flex-col items-center py-2',
  ];
  if (direction === 'top') classList.push('bottom-full');
  else classList.push('top-0');

  function optionChangeHandler(e: MouseEvent<HTMLOptionElement>) {
    onChange(e.currentTarget.value);
    setIsVisible(false);
  }

  return (
    <div className="relative">
      <Button
        variant="outlined"
        onClick={() => setIsVisible(true)}
      >
        {label}
      </Button>
      {isVisible && (
        <>
          <div
            className="fixed h-screen w-screen top-0 left-0"
            onClick={() => setIsVisible(false)}
          />
          <datalist className={classList.join(' ')}>
            {options.map((option) => (
              <option
                key={option}
                value={option}
                className="p-2 w-full cursor-pointer hover:bg-smokey-gray overflow-hidden"
                onClick={(e) => optionChangeHandler(e)}
              >
                {option}
              </option>
            ))}
          </datalist>
        </>
      )}
    </div>
  );
};
export default PopoverMenu;
