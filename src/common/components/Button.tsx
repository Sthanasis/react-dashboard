import { MouseEvent, ReactNode } from 'react';
import RippleContainer from './RippleContainer';

type ButtonVariant = 'filled' | 'outlined' | 'text';

interface ButtonProps {
  variant: ButtonVariant;
  children: ReactNode;
  rounded?: boolean;
  disabled?: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  children,
  variant,
  rounded = false,
  disabled,
  onClick,
}: ButtonProps) => {
  const baseClasses =
    'cursor-pointer overflow-hidden flex items-center relative outline-none duration-200 ';
  const variantClasses = {
    filled:
      'bg-primary text-white hover:bg-opacity-level-80 focus:bg-opacity-level-80',
    outlined:
      'text-primary border hover:bg-primary hover:bg-opacity-level-10 focus:bg-primary focus:bg-opacity-level-10 border-solid border-primary border-opacity-50 hover:border-opacity-100  focus:border-opacity-100 ',
    text: 'text-primary hover:bg-primary hover:bg-opacity-level-10 focus:bg-primary focus:bg-opacity-level-10',
  };

  return (
    <button
      className={[
        baseClasses,
        variantClasses[variant],
        rounded ? 'rounded-full p-2' : 'px-3 py-1 rounded-md',
      ].join(' ')}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
      <RippleContainer />
    </button>
  );
};

export default Button;
