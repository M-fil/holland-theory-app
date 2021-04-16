export abstract class Storage {
  public save<T>(key: string, value: T): void {
    throw new Error('The save method should be reinitialized');
  }

  public get<T>(key: string): T | null {
    throw new Error('The get method should be reinitialized');
  }
}