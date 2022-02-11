import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../service/prisma.service';
import { DemoUser } from '@prisma/client';
import { DemoUserUpdateDto } from '../../dto/demoUser/demoUser.update.dto';
import { DemoUserCreateDto } from '../../dto/demoUser/demoUser.create.dto';

@Injectable()
export class DemoUserService {
  private readonly logger = new Logger(DemoUserService.name);

  constructor(private prisma: PrismaService) {
    this.logger.debug('instantiated a new instance of test service');
  }

  /**
   * Creates entity in the datastore
   *
   * @param demoUserCreateDto
   * @returns DemoUser
   */
  async create(demoUserCreateDto: DemoUserCreateDto): Promise<DemoUser> {
    const data = {
      name: demoUserCreateDto.name,
      email: demoUserCreateDto.email,
      password: demoUserCreateDto.password,
      active: true,
    };

    const demoUser: DemoUser = (await this.prisma.demoUser.create({
      data,
    })) as DemoUser;

    return demoUser;
  }

  /**
   * Updates entity in the datastore
   *
   * @param demoUserUpdateDto
   * @returns DemoUser
   */
  async update(demoUserUpdateDto: DemoUserUpdateDto): Promise<DemoUser> {
    const data = {
      name: demoUserUpdateDto.name,
      email: demoUserUpdateDto.email,
      password: demoUserUpdateDto.password,
      active: true,
    };
    const demoUser: DemoUser = (await this.prisma.demoUser.update({
      where: {
        id: demoUserUpdateDto.id,
      },
      data: {
        ...data,
      },
    })) as DemoUser;

    return demoUser;
  }

  /**
   * Finds all entitis in the datastore
   *
   * @param id
   * @param name
   * @param email
   * @returns array of DemoUser entities
   */
  async findAll(
    id: number | null,
    name: string | null,
    email: string | null,
  ): Promise<DemoUser[]> {
    const demoUsers: DemoUser[] = (await this.prisma.demoUser.findMany({
      orderBy: { createdAt: 'desc' },
    })) as DemoUser[];
    return demoUsers;
  }

  /**
   * Finds entity by login information
   *
   * @param email
   * @param password
   * @returns DemoUser
   */
  async findOne(email: string, password: string): Promise<DemoUser> {
    // TODO: validate method params
    const demoUser: DemoUser = (await this.prisma.demoUser.findFirst({
      where: {
        AND: [
          {
            email: {
              equals: email,
            },
          },
          {
            password: {
              equals: password,
            },
          },
        ],
      },
    })) as DemoUser;

    return demoUser;
  }

  /**
   * Finds entity by the given id
   *
   * @param id
   * @returns DemoUser
   */
  async findById(id: number): Promise<DemoUser> {
    // TODO: validate method params
    this.logger.debug(`finding demoUser in the datastore by demoUserId[${id}]`);
    const demoUser: DemoUser = (await this.prisma.demoUser.findUnique({
      where: {
        id: id,
      },
    })) as DemoUser;

    if (demoUser) {
      this.logger.debug(
        `found demoUser[${JSON.stringify(
          demoUser,
        )}] in the datastore by demoUserId[${id}]`,
      );
    } else {
      this.logger.debug(
        `could not find any demoUser record in the datastore by demoUserId[${id}]`,
      );
    }

    return demoUser;
  }

  /**
   * Deletes entity by the given id
   *
   * @param id
   * @returns DemoUser
   */
  async purge(id: number): Promise<DemoUser> {
    const demoUser: DemoUser = (await this.prisma.demoUser.delete({
      where: {
        id,
      },
    })) as DemoUser;
    return demoUser;
  }

  /**
   * Sets deleted column to true (soft-delete) for entity by the given id
   * @param id
   * @returns DemoUser
   */
  async delete(id: number): Promise<DemoUser> {
    const data = {
      deleted: true,
    };
    const demoUser: DemoUser = (await this.prisma.demoUser.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    })) as DemoUser;

    return demoUser;
  }
}
