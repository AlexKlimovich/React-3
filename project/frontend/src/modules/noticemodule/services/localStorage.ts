import type { BaseNotice } from '@/pages/notice/types';

class LocalStorage {
  #key = '';
  constructor(key = 'noKey') {
    this.#key = key;
  }

  protected set(data: unknown) {
    try {
      localStorage.setItem(this.#key, JSON.stringify(data));
    } catch (e) {
      console.error(e);
    }
  }

  protected get<InputType>(): InputType | null {
    const result = localStorage.getItem(this.#key);
    if (result === null) return null;

    try {
      const res = JSON.parse(result) as InputType;
      return res;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}

export class NoticesStore extends LocalStorage {
  private static key = 'notices';
  notices: BaseNotice[] = [];

  constructor() {
    super(NoticesStore.key);
    const notices = this.get<BaseNotice[]>();
    if (notices) {
      this.notices = notices;
    }
  }

  sync(notices: BaseNotice[]) {
    this.set(notices);
  }

  getNotices() {
    return Object.values(this.notices);
  }
}
