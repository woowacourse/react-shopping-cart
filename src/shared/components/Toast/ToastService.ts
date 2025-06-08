export type ToastType = "success" | "error" | "warning" | "info";

export type ToastInfo = {
  id: string;
  type: ToastType;
  message: string;
};

type ToastObserver = (toastInfo: ToastInfo) => void;

export class ToastService {
  private static instance: ToastService;
  private observers: ToastObserver[] = [];
  private toastInfos: ToastInfo[] = [];

  private constructor() {}

  public static getInstance(): ToastService {
    if (!ToastService.instance) {
      ToastService.instance = new ToastService();
    }

    return ToastService.instance;
  }

  subscribe(observer: ToastObserver) {
    this.observers.push(observer);
  }

  unsubscribe(observer: ToastObserver) {
    this.observers = this.observers.filter((prev) => prev !== observer);
  }

  notifyObserver() {
    this.observers.forEach((observer) =>
      observer(this.toastInfos[this.toastInfos.length - 1])
    );
  }

  addToast(id: string, type: ToastType, message: string) {
    this.toastInfos.push({ id, type, message });
    this.notifyObserver();
  }
}
