const LOG_LEVELS = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR'
};

class Logger {
  constructor() {
    this.logLevel = process.env.NODE_ENV === 'production' ? LOG_LEVELS.INFO : LOG_LEVELS.DEBUG;
  }

  formatLog(level, message, data = {}) {
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      message,
      ...data,
      environment: process.env.NODE_ENV,
      app: 'shopping-mall-frontend'
    });
  }

  debug(message, data) {
    if (this.shouldLog(LOG_LEVELS.DEBUG)) {
      console.debug(this.formatLog(LOG_LEVELS.DEBUG, message, data));
    }
  }

  info(message, data) {
    if (this.shouldLog(LOG_LEVELS.INFO)) {
      console.info(this.formatLog(LOG_LEVELS.INFO, message, data));
    }
  }

  warn(message, data) {
    if (this.shouldLog(LOG_LEVELS.WARN)) {
      console.warn(this.formatLog(LOG_LEVELS.WARN, message, data));
    }
  }

  error(message, error, data) {
    if (this.shouldLog(LOG_LEVELS.ERROR)) {
      console.error(this.formatLog(LOG_LEVELS.ERROR, message, {
        ...data,
        error: error ? {
          message: error.message,
          stack: error.stack,
          name: error.name
        } : undefined
      }));
    }
  }

  shouldLog(level) {
    const levels = Object.values(LOG_LEVELS);
    return levels.indexOf(level) >= levels.indexOf(this.logLevel);
  }
}

export const logger = new Logger(); 