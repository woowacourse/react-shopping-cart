type Listener = (message: string | null) => void;

let message: string | null = null;
const listeners = new Set<Listener>();

export function showErrorToast(newMessage: string) {
  message = newMessage;
  listeners.forEach((listener) => listener(message));
  setTimeout(() => {
    message = null;
    listeners.forEach((listener) => listener(message));
  }, 3000);
}

export function subscribeToast(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
