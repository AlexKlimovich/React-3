import type { BaseNotice } from '@/modules/noticemodule/types';
import type { Task } from '@/modules/todolistmodule/types/types';
import type { User } from '@/types';

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

  sync<InputType>(items: InputType) {
    this.set(items);
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

  getNotices() {
    return Object.values(this.notices);
  }
}

export class TasksStorage extends LocalStorage {
  private static key = 'tasks';
  tasks: Task[] = [];

  constructor() {
    super(TasksStorage.key);
    const tasks = this.get<Task[]>();
    if (tasks) {
      this.tasks = tasks;
    }
  }

  getTasks() {
    return Object.values(this.tasks);
  }
}

export class UserAuth extends LocalStorage {
  private static key = 'user';
  user: User | undefined;

  constructor() {
    super(UserAuth.key);
    const user = this.get<User>();
    if (user) {
      this.user = user;
    }
  }

  // remove(): void {
  //   localStorage.removeItem(UserAuth.key);
  // }

  // clear(): void {
  //   localStorage.clear();
  // }
}
