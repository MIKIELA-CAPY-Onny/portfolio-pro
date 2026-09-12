import { createContext, useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';

export const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const notify = useMemo(
    () => ({
      success: (message) => toast.success(message),
      error: (message) => toast.error(message),
      info: (message) => toast(message, { icon: '\u2139\uFE0F' }),
      warning: (message) => toast(message, { icon: '\u26A0\uFE0F' }),
      loading: (message) => toast.loading(message),
      dismiss: (id) => toast.dismiss(id),
      promise: (promise, messages) =>
        toast.promise(promise, {
          loading: messages.loading || 'Chargement...',
          success: messages.success || 'Succ\u00E8s !',
          error: messages.error || 'Une erreur est survenue',
        }),
    }),
    []
  );

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
    </NotificationContext.Provider>
  );
};