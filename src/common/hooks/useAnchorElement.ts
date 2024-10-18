import { useState, MouseEvent } from 'react';

const useAnchoreElement = (initialState?: HTMLButtonElement | null) => {
  const [anchorEl, setAnchorEl] = useState(initialState);
  const visible = Boolean(anchorEl);

  const showPopover = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const closePopover = () => setAnchorEl(null);

  return { anchorEl, visible, showPopover, closePopover };
};

export default useAnchoreElement;
