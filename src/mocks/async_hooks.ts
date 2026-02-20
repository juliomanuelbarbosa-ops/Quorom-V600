export class AsyncLocalStorage {
  private store: any;
  constructor() {
    this.store = null;
  }
  run(store: any, callback: () => any) {
    this.store = store;
    try {
      return callback();
    } finally {
      this.store = null;
    }
  }
  getStore() {
    return this.store;
  }
}
