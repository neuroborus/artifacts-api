import { Injectable } from '@nestjs/common';
import { TasksQueueService } from 'tasks-mad-queue';

@Injectable()
export class DataProcessor {
  constructor(private readonly queue: TasksQueueService) {}

  public process<T>(task: () => Promise<T>): Promise<T> {
    return this.queue.enqueueAndWait<T>(task);
  }
}
