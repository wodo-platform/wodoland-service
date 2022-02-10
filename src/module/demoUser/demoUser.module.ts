import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaService } from '../../service/prisma.service';
import { DemoUserService } from './demoUser.service';
import { DemoUserController } from './demoUser.controller';

@Module({
  imports: [],
  providers: [PrismaService, DemoUserService],
  controllers: [DemoUserController],
  exports: [DemoUserService],
})
export class DemoUserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {}
}
