import { setTimeout } from 'node:timers/promises';
import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import Queue from 'bee-queue';
import { ActionsProcessor } from '@/processors/actions-processors';
import { DataProcessor } from '@/processors/data-processors';
import {
  ActionResponse,
  DepositItemResponse,
  FightResponse,
  GetCharacterResponse,
  MoveResponse,
} from '@/entities/artifacts';
import { ActionsCalls } from '@/calls/actions';
import { DataCalls } from '@/calls/data';
import { waitForTask } from '@/helpers/queue';

@Injectable()
export class CharactersService {
  private readonly logger = new Logger(CharactersService.name);
  constructor(
    private readonly characterQueues: Record<string, Queue>,
    private readonly actionsProcessor: ActionsProcessor,
    private readonly dataProcessor: DataProcessor,
    private readonly actionsCalls: ActionsCalls,
    private readonly dataCalls: DataCalls,
    private readonly config: ConfigService,
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
        this.logger.warn(
          `${
            this.config.getOrThrow('account.prefixes')[character]
          } -> exit from <${tag}> after [${counter}] iterations`,
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
      next = await waitForTask<boolean>(
        this.characterQueues[character],
        iteration,
      );
    }
    this.logger.log(
      `${
        this.config.getOrThrow('account.prefixes')[character]
      } -> donw with <${tag}> after [${counter}] iterations`,
    );
  }

  private enqueueAction<T extends ActionResponse>(
    character: string,
    call: () => Promise<T | null>,
  ) {
    return waitForTask<T | null>(this.characterQueues[character], async () => {
      const result = await this.actionsProcessor.process<T | null>(call);
      if (result) {
        await setTimeout(result.cooldown.total_seconds * 1000);
      }
      return result;
    });
  }

  ////////////////

  move(
    character: string,
    posX: number,
    posY: number,
  ): Promise<MoveResponse | null> {
    return this.enqueueAction(
      character,
      async () => await this.actionsCalls.move(character, posX, posY),
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
        await this.actionsCalls.depositItem(character, itemCode, itemQuantity),
    );
  }
  async fight(
    character: string,
    loopIterations?: number,
  ): Promise<FightResponse | null> {
    if (loopIterations !== undefined) {
      await this.loopAction(
        character,
        async () => await this.actionsCalls.fight(character),
        'fight' + Date.now(),
        loopIterations,
      );
      return null;
    }
    return this.enqueueAction(
      character,
      async () => await this.actionsCalls.fight(character),
    );
  }

  // Data

  characterData(character: string): Promise<GetCharacterResponse | null> {
    return this.dataProcessor.process(
      async () => await this.dataCalls.character(character),
    );
  }
}
