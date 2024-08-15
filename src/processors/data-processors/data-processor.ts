import { Injectable } from '@nestjs/common';
import Queue from 'bee-queue';
import { waitForTask } from '@/helpers/queue';

@Injectable()
export class DataProcessor {
  constructor(private readonly queue: Queue, private readonly delay: number) {}

  public process<T>(task: () => Promise<T>): Promise<T> {
    return waitForTask(this.queue, task, this.delay);
  }
}
