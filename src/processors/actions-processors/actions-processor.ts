import { Injectable } from '@nestjs/common';
import Queue from 'bee-queue';
import { waitForTask } from '@/helpers/queue';

@Injectable()
export class ActionsProcessor {
  constructor(private readonly queue: Queue, private readonly delay: number) {}

  public async process<T>(task: () => Promise<T>): Promise<T> {
    const tmp = await waitForTask(this.queue, task);
    return waitForTask(this.queue, task, this.delay);
  }
}
