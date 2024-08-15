const name = 'Character';
const db = 1;
export const CHARACTER_QUEUE_DEFAULTS = {
  name,
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
    activateDelayedJobs: false,
    removeOnSuccess: true,
    removeOnFailure: true,
    redisScanCount: 100,
    autoConnect: true,
  },
};
