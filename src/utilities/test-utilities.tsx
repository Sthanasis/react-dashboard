import { renderHook } from '@testing-library/react';
import { render as tlRender } from '@testing-library/react';
import { ReactNode } from 'react';

const render = (ui: ReactNode, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return {
    ...tlRender(<>{ui}</>),
  };
};
export * from '@testing-library/react';
export { render, renderHook };
