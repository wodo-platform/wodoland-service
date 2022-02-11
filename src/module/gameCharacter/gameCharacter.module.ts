import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaService } from '../../service/prisma.service';
import { GameCharacterService } from './gameCharacter.service';
import { GameCharacterController } from './gameCharacter.controller';

@Module({
  imports: [],
  providers: [PrismaService, GameCharacterService],
  controllers: [GameCharacterController],
  exports: [GameCharacterService],
})
export class GameCharacterModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {}
}
