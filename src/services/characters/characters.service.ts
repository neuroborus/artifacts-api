import { setTimeout } from "node:timers/promises";
import { Injectable } from '@nestjs/common';
import { TasksQueueService } from 'tasks-mad-queue';
import { PREFIXES } from '@/config';
import { ActionsProcessor } from '@/processors/actions-processors';
import { DataProcessor } from '@/processors/data-processors';
import {
  ActionResponse,
  DepositItemResponse,
  FightResponse,
  GetCharacterResponse,
  MoveResponse,
} from '@/entities/artifacts';
import * as actionsCalls from '@/calls/actions';
import * as dataCalls from '@/calls/data';

@Injectable()
export class CharactersService {
  constructor(
    private readonly characterQueues: Record<string, TasksQueueService>,
    private readonly actionsProcessor: ActionsProcessor,
    private readonly dataProcessor: DataProcessor,
  ) {}

  private async loopAction<T extends ActionResponse>(
    character: string,
    call: () => Promise<T | null>,
    tag: string,
    loopIterations = 0,
  ): Promise<void> {
    let counter = 0;
    const iteration = async (): Promise<boolean> => {
      const result = await this.actionsProcessor.process<T | null>(call);
      if (!result) {
        console.warn(
          `${PREFIXES[character]} -> exit from <${tag}> after [${counter}] iterations`,
        );
        return false;
      }
      counter += 1;
      if (loopIterations && loopIterations >= counter) return false;
      await setTimeout(result.cooldown.total_seconds * 1000);
      return true;
    };

    let next = true;
    while (next) {
      next = await this.characterQueues[character].enqueueAndWait<boolean>(
        iteration,
      );
    }
    console.info(
      `${PREFIXES[character]} -> donw with <${tag}> after [${counter}] iterations`,
    );
  }

  private enqueueAction<T extends ActionResponse>(
    character: string,
    call: () => Promise<T | null>,
  ) {
    return this.characterQueues[character].enqueueAndWait<T | null>(
      async () => {
        const result = await this.actionsProcessor.process<T | null>(call);
        if (result) {
          await setTimeout(result.cooldown.total_seconds * 1000);
        }
        return result;
      },
    );
  }

  ////////////////

  move(
    character: string,
    posX: number,
    posY: number,
  ): Promise<MoveResponse | null> {
    return this.enqueueAction(
      character,
      async () => await actionsCalls.move(character, posX, posY),
    );
  }
  depositItem(
    character: string,
    itemCode: string,
    itemQuantity: number,
  ): Promise<DepositItemResponse | null> {
    return this.enqueueAction(
      character,
      async () =>
        await actionsCalls.depositItem(character, itemCode, itemQuantity),
    );
  }
  async fight(
    character: string,
    loopIterations?: number,
  ): Promise<FightResponse | null> {
    if (loopIterations !== undefined) {
      await this.loopAction(
        character,
        async () => await actionsCalls.fight(character),
        'fight' + Date.now(),
        loopIterations,
      );
      return null;
    }
    return this.enqueueAction(
      character,
      async () => await actionsCalls.fight(character),
    );
  }

  // Data

  characterData(character: string): Promise<GetCharacterResponse | null> {
    return this.dataProcessor.process(
      async () => await dataCalls.character(character),
    );
  }
}
