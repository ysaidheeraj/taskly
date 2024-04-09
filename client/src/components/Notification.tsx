import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface NotificationType {
    success: (message: string) => void;
    error: (message: string) => void;
}

const Notification: NotificationType = {
  success: (message) => {
    toast.success(message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  },
  error: (message) => {
    toast.error(message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

export default Notification;