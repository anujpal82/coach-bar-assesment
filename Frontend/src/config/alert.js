import { toast } from 'react-toastify';

// Display toast
export const displayErrorToast = (message, time) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: time || 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const displaySuccessToast = (message, time) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: time || 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const displayInfoToast = (message, time) => {
  toast.info(message, {
    position: 'top-right',
    autoClose: time || 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
