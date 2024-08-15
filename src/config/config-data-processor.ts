const name = 'DataQueue';
const delay = 62;
const db = 1;
export const DATA_QUEUE_DEFAULTS = {
  name,
  delay,
  settings: {
    prefix: `${name}-`,
    stallInterval: 5000,
    nearTermWindow: 1200000,
    delayedDebounce: 1000,
    redis: {
      host: '127.0.0.1',
      port: 6379,
      db,
      options: {},
    },
    isWorker: true,
    getEvents: true,
    sendEvents: true,
    storeJobs: true,
    ensureScripts: true,
    activateDelayedJobs: true,
    removeOnSuccess: true,
    removeOnFailure: true,
    redisScanCount: 100,
    autoConnect: true,
  },
};
