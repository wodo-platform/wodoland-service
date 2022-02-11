import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../service/prisma.service';
import { GameCharacterController } from './gameCharacter.controller';
import { GameCharacterService } from './gameCharacter.service';
import { mockDeep } from 'jest-mock-extended';
import { GameCharacters } from '.prisma/client';

describe('GameCharacterController', () => {
  let gameCharacterModuleRef: TestingModule;
  let GameCharacterController: GameCharacterController;
  let GameCharacterService: GameCharacterService;
  let prismaService;

  beforeAll(async () => {
    prismaService = mockDeep<PrismaService>();

    // define a Nest custom value provider: https://docs.nestjs.com/fundamentals/custom-providers
    const PrismaServiceProvider = {
      provide: PrismaService,
      useValue: prismaService,
    };

    gameCharacterModuleRef = await Test.createTestingModule({
      controllers: [GameCharacterController],
      providers: [String, GameCharacterService, PrismaServiceProvider],
    }).compile();
  });

  beforeEach(async () => {
    GameCharacterService = gameCharacterModuleRef.get<GameCharacterService>(GameCharacterService);
    prismaService = gameCharacterModuleRef.get<PrismaService>(PrismaService);
    GameCharacterController =
      gameCharacterModuleRef.get<GameCharacterController>(GameCharacterController);
  });

  describe('findAll', () => {
    it('should return an array of demos', async () => {
      const gameCharacter: GameCharacters = {
        id: 1,
        name: 'Hercules',
        uid: 1,
        active: true,
        faction: 'Human',
        class: 'Ranger',
        characterData: '{}',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result: GameCharacters[] = [gameCharacter];

      prismaService.gameCharacter.findMany.mockResolvedValue(result);

      // since PrismaService is mocked, both controller and respective service class is tested here.
      // No need to mock service class methods
      //jest.spyOn(GameCharacterController, 'findAll').mockImplementation(() => result);

      expect(await GameCharacterController.findAll()).toBe(result);
    });
  });
});
