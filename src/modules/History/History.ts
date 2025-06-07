interface PushStateParams {
  state?: unknown;
  title?: string;
  url?: string;
}

export default class History {
  static push({ state = null, title = "", url = "" }: PushStateParams) {
    window.history.pushState(state, title, url);
  }

  static replace({ state = null, title = "", url = "" }: PushStateParams) {
    window.history.replaceState(state, title, url);
  }

  static back() {
    window.history.back();
  }

  static forward() {
    window.history.forward();
  }

  static go(delta: number) {
    window.history.go(delta);
  }
}
