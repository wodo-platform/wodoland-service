import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      datasources: {
        db: {
          url: 'mysql://wodouser:YTc6W.ww6.xkxuj==!5yEUL+Ba+GK5@local.dev.com:3306/wodotestdb',
        },
      },
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
    } catch (e) {
      console.log(e);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
