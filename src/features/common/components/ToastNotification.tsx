import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Ref, forwardRef, useEffect } from 'react';
import { Notification } from '@/types/notification';
import Button from './Button';

const ToastNotification = forwardRef(function ToastNotificationWithRef(
  {
    notification,
    onRemove,
  }: {
    notification: Notification;
    onRemove: (id: number) => void;
  },
  ref: Ref<HTMLDivElement>
) {
  const { content, header, id } = notification;

  useEffect(() => {
    const timeout = setTimeout(() => onRemove(id), 3000);
    return () => clearTimeout(timeout);
  });

  return (
    <div
      ref={ref}
      className="flex flex-col my-2 rounded-md w-full bg-red-200 overflow-hidden border border-red-500"
    >
      <div className="flex px-2 justify-between text-snow-white items-center bg-red-500">
        <h1 className="">{header}</h1>
        <Button
          rounded
          variant="text"
          onClick={() => onRemove(id)}
        >
          <FontAwesomeIcon
            icon={faXmark}
            width={16}
            height={16}
          />
        </Button>
      </div>
      <p className="p-2">{content}</p>
    </div>
  );
});
export default ToastNotification;
