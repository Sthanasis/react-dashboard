import { ReactNode } from 'react';
import RippleContainer from './RippleContainer';

type ButtonVariant = 'filled' | 'outlined' | 'text';

interface ButtonProps {
  variant: ButtonVariant;
  children: ReactNode;
}

const Button = ({ children, variant }: ButtonProps) => {
  const baseClasses =
    'cursor-pointer overflow-hidden flex items-center relative rounded-md outline-none duration-200 px-3 py-1';
  const variantClasses = {
    filled:
      'bg-primary text-white hover:bg-opacity-level-80 focus:bg-opacity-level-80',
    outlined:
      'text-primary border hover:bg-primary hover:bg-opacity-level-10 focus:bg-primary focus:bg-opacity-level-10 border-solid border-primary border-opacity-50 hover:border-opacity-100  focus:border-opacity-100 ',
    text: 'text-primary hover:bg-primary hover:bg-opacity-level-10 focus:bg-primary focus:bg-opacity-level-10',
  };

  return (
    <button className={[baseClasses, variantClasses[variant]].join(' ')}>
      {children}
      <RippleContainer />
    </button>
  );
};

export default Button;
