import * as Queue from 'bee-queue';
import { Job } from 'bee-queue';

export async function waitForTask<T>(
  queue: Queue<any>,
  task: () => Promise<T>,
  delay = 0,
): Promise<T> {
  // Create a job and save it to the queue
  const job = await queue
    .createJob({})
    .delayUntil(Date.now() + delay)
    .retries(0)
    .save();

  // Return a promise that resolves when the job is processed
  return new Promise<T>((resolve, reject) => {
    job.on('succeeded', (result: T) => {
      resolve(result);
    });

    job.on('failed', (error: Error) => {
      reject(error);
    });
  });
}
