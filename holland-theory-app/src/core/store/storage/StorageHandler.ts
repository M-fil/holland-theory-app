import { Storage } from './index';

export class StorageHandler {
  constructor(
    private storage: Storage,
  ) {}

  public saveValue<T>(key: string, value: T): void {
    this.storage.save<T>(key, value);
  }

  public getValue<T>(key: string): T | null {
    return this.storage.get(key);
  }
}
