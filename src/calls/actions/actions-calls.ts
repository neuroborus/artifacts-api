import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DepositItemResponse,
  FightResponse,
  MoveResponse,
} from '@/entities/artifacts';

@Injectable()
export class ActionsCalls {
  private readonly logger = new Logger(ActionsCalls.name);
  constructor(private readonly config: ConfigService) {}

  public async depositItem(
    character: string,
    itemCode: string,
    itemQuantity: number,
  ): Promise<DepositItemResponse | null> {
    const url =
      this.config.getOrThrow('requests.server') +
      '/my/' +
      character +
      '/action/bank/deposit';
    const options = {
      method: 'POST',
      headers: this.config.getOrThrow('requests.headers'),
      body: `{"code":"${itemCode}","quantity":${itemQuantity}}`,
    };

    try {
      const response = await fetch(url, options);

      if (response.ok) {
        const { data } = await response.json();
        this.logger.log(
          this.config.getOrThrow('account.prefixes')[character] +
            `deposited items to bank (${itemCode} [${itemQuantity}])`,
        );
        return data as DepositItemResponse;
      } else {
        this.logger.error(
          this.config.getOrThrow('account.prefixes')[character] +
            'Something went wrong',
        );
      }
    } catch (error) {
      this.logger.error(
        this.config.getOrThrow('account.prefixes')[character] + error,
      );
    }
    return null;
  }

  public async fight(character: string): Promise<FightResponse | null> {
    const url =
      this.config.getOrThrow('requests.server') +
      '/my/' +
      character +
      '/action/fight';

    const fightResponse = await fetch(url, {
      method: 'POST',
      headers: this.config.getOrThrow('requests.headers'),
    });

    const prefix = this.config.getOrThrow('account.prefixes')[character];
    if (fightResponse.status === 498) {
      this.logger.warn(
        prefix + 'The character cannot be found on your account.',
      );
    } else if (fightResponse.status === 497) {
      this.logger.log(prefix + "Your character's inventory is full.");
    } else if (fightResponse.status === 499) {
      this.logger.warn(prefix + 'Your character is in cooldown.');
    } else if (fightResponse.status === 598) {
      this.logger.warn(prefix + 'No monster on this map.');
    } else if (fightResponse.status !== 200) {
      this.logger.error(prefix + 'An error occurred during the fight.');
    } else {
      const { data } = await fightResponse.json();
      this.logger.log(
        prefix +
          'The fight ended successfully. You have ' +
          data.fight.result +
          '.',
      );
      return data as FightResponse;
    }
    return null;
  }

  public async move(
    character: string,
    posX: number,
    posY: number,
  ): Promise<MoveResponse | null> {
    const url =
      this.config.getOrThrow('requests.server') +
      '/my/' +
      character +
      '/action/move';
    const options = {
      method: 'POST',
      headers: this.config.getOrThrow('requests.headers'),
      body: `{"x":${posX},"y":${posY}}`,
    };

    try {
      const response = await fetch(url, options);
      const { data } = await response.json();
      this.logger.log(
        this.config.getOrThrow('account.prefixes')[character] +
          `moved to [${posX}, ${posY}]`,
      );
      return data as MoveResponse;
    } catch (error) {
      this.logger.error(
        this.config.getOrThrow('account.prefixes')[character] + error,
      );
    }
    return null;
  }
}
