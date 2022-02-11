import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../service/prisma.service';
import { GameCharacters } from '@prisma/client';
import { GameCharacterUpdateDto } from '../../dto/gameCharacter/gameCharacter.update.dto';
import { GameCharacterCreateDto } from '../../dto/gameCharacter/gameCharacter.create.dto';

@Injectable()
export class GameCharacterService {
  private readonly logger = new Logger(GameCharacterService.name);

  constructor(private prisma: PrismaService) {
    this.logger.debug('instantiated a new instance of test service');
  }

  /**
   * Creates entity in the datastore
   *
   * @param gameCharacterCreateDto
   * @returns GameCharacters
   */
  async create(
    gameCharacterCreateDto: GameCharacterCreateDto,
  ): Promise<GameCharacters> {
    const data = {
      name: gameCharacterCreateDto.name,
      uid: gameCharacterCreateDto.uid,
      faction: gameCharacterCreateDto.faction,
      class: gameCharacterCreateDto.class,
      characterData: gameCharacterCreateDto.characterData,
      active: true,
    };

    const gameCharacter: GameCharacters =
      (await this.prisma.gameCharacters.create({
        data,
      })) as GameCharacters;

    return gameCharacter;
  }

  /**
   * Updates entity in the datastore
   *
   * @param gameCharacterUpdateDto
   * @returns GameCharacters
   */
  async update(
    gameCharacterUpdateDto: GameCharacterUpdateDto,
  ): Promise<GameCharacters> {
    const data = {
      name: gameCharacterUpdateDto.name,
      uid: gameCharacterUpdateDto.uid,
      faction: gameCharacterUpdateDto.faction,
      class: gameCharacterUpdateDto.class,
      characterData: gameCharacterUpdateDto.characterData,
      active: true,
    };
    const gameCharacter: GameCharacters =
      (await this.prisma.gameCharacters.update({
        where: {
          id: gameCharacterUpdateDto.id,
        },
        data: {
          ...data,
        },
      })) as GameCharacters;

    return gameCharacter;
  }

  /**
   * Finds all entitis in the datastore
   *
   * @param id
   * @param name
   * @param email
   * @returns array of GameCharacters entities
   */
  async findAll(
    id: number | null,
    uid: number | null,
    name: string | null,
  ): Promise<GameCharacters[]> {
    const gameCharacters: GameCharacters[] =
      (await this.prisma.gameCharacters.findMany({
        orderBy: { createdAt: 'desc' },
      })) as GameCharacters[];
    return gameCharacters;
  }

  /**
   * Finds entity by the given id
   *
   * @param id
   * @returns GameCharacters
   */
  async findById(id: number): Promise<GameCharacters> {
    // TODO: validate method params
    this.logger.debug(
      `finding gameCharacter in the datastore by gameCharacterId[${id}]`,
    );
    const gameCharacter: GameCharacters =
      (await this.prisma.gameCharacters.findUnique({
        where: {
          id: id,
        },
      })) as GameCharacters;

    if (gameCharacter) {
      this.logger.debug(
        `found gameCharacter[${JSON.stringify(
          gameCharacter,
        )}] in the datastore by gameCharacterId[${id}]`,
      );
    } else {
      this.logger.debug(
        `could not find any gameCharacter record in the datastore by gameCharacterId[${id}]`,
      );
    }

    return gameCharacter;
  }

  /**
   * Finds entity by the given id
   *
   * @param uid
   * @returns GameCharacters
   */
  async findByUid(uid: number): Promise<GameCharacters[]> {
    const gameCharacters: GameCharacters[] =
      (await this.prisma.gameCharacters.findMany({
        where: {
          uid: uid,
        },
      })) as GameCharacters[];

    return gameCharacters;
  }

  /**
   * Deletes entity by the given id
   *
   * @param id
   * @returns GameCharacters
   */
  async purge(id: number): Promise<GameCharacters> {
    const gameCharacter: GameCharacters =
      (await this.prisma.gameCharacters.delete({
        where: {
          id,
        },
      })) as GameCharacters;
    return gameCharacter;
  }

  /**
   * Sets deleted column to true (soft-delete) for entity by the given id
   * @param id
   * @returns GameCharacters
   */
  async delete(id: number): Promise<GameCharacters> {
    const data = {
      deleted: true,
    };
    const gameCharacter: GameCharacters =
      (await this.prisma.gameCharacters.update({
        where: {
          id: id,
        },
        data: {
          ...data,
        },
      })) as GameCharacters;

    return gameCharacter;
  }
}
