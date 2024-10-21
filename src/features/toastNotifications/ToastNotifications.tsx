import { useAppDispatch, useAppSelector } from '@/store/hooks';
import ToastNotification from '../common/components/ToastNotification';
import { removeNotification } from '@/store/features/notifications/notificationsSlice';

const ToastNotifications = () => {
  const notifications = useAppSelector((state) => state.notifications.list);
  const dispatch = useAppDispatch();

  return (
    <div className="fixed right-3 bottom-3 w-96 z-10 overflow-hidden">
      {notifications.map((notification) => (
        <ToastNotification
          notification={notification}
          onRemove={(id) => dispatch(removeNotification(id))}
        />
      ))}
    </div>
  );
};

export default ToastNotifications;
