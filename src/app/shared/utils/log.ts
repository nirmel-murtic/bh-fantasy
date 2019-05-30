import {environment} from '../../../environments/environment';

export let Level = {
  DEBUG: 1,
  INFO: 2,
  WARNING: 3,
  ERROR: 4,
  DISABLED: 5
};

export class Log {
  static debug(text: any): void {
    if (environment.logLevel <= Level.DEBUG) {
      console.log(`%c[DEBUG]`, 'color:#2ecc71', text);
    }
  }

  static info(text: any): void {
    if (environment.logLevel <= Level.INFO) {
      console.log(`%c[INFO]`, 'color:#00bcd4', text);
    }
  }

  static warning(text: any): void {
    if (environment.logLevel <= Level.WARNING) {
      console.log(`%c[WARNING]`, 'color:#f39c12', text);
    }
  }

  static error(text: any): void {
    if (environment.logLevel <= Level.ERROR) {
      console.log(`%c[ERROR]`, 'color:#e74c3c', text);
    }
  }

  static action(text: any): void {
    if (environment.logLevel <= Level.INFO) {
      console.log(`%c[ACTION]`, 'color:#3f51b5', text);
    }
  }
}
