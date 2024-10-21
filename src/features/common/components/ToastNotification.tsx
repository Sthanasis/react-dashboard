import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Ref, forwardRef } from 'react';
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

  return (
    <div
      ref={ref}
      className="flex flex-col p-2 pt-1 rounded-md w-full bg-red-600"
    >
      <div className="flex justify-between items-center">
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
      <p>{content}</p>
    </div>
  );
});
export default ToastNotification;
