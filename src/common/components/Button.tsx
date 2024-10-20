import { MouseEvent, ReactNode } from 'react';
import RippleContainer from './RippleContainer';

type ButtonVariant = 'filled' | 'outlined' | 'text';
type ButtonColor = 'primary' | 'default';

interface ButtonProps {
  variant: ButtonVariant;
  children: ReactNode;
  type?: 'button' | 'submit';
  color?: ButtonColor;
  rounded?: boolean;
  disabled?: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  children,
  variant,
  type = 'button',
  color = 'default',
  rounded = false,
  disabled,
  onClick,
}: ButtonProps) => {
  const baseClasses =
    'cursor-pointer overflow-hidden flex items-center relative outline-none duration-200 disabled:text-gray-400';

  const variantClasses = {
    filled: 'hover:bg-opacity-level-80 focus:bg-opacity-level-80',
    outlined:
      'border border-solid  hover:bg-opacity-level-10 focus:bg-opacity-level-10 hover:border-opacity-100  focus:border-opacity-100 ',
    text: 'hover:bg-opacity-level-10 focus:bg-opacity-level-10',
  };

  const primaryClasses = {
    filled: 'bg-primary text-white',
    outlined:
      'text-primary  border-primary border-opacity-50 hover:bg-primary focus:bg-primary',
    text: 'text-primary hover:bg-primary focus:bg-primary ',
  };

  const defaultClasses = {
    filled: 'bg-slate-gray hover:bg-slate-500',
    outlined:
      'text-slate-gray border-slate-gray border-opacity-50 hover:bg-smokey-gray focus:bg-slate-gray',
    text: 'hover:bg-slate-gray focus:bg-slate-gray disabled:hover:bg-transparent disabled:cursor-default',
  };

  const buttonStyle = {
    primary: primaryClasses[variant],
    default: defaultClasses[variant],
  };

  return (
    <button
      className={[
        baseClasses,
        variantClasses[variant],
        buttonStyle[color],
        rounded ? 'rounded-full p-2' : 'px-3 py-1 rounded-md',
      ].join(' ')}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
      <RippleContainer />
    </button>
  );
};

export default Button;
