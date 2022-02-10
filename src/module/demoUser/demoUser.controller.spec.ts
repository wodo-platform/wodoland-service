import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../service/prisma.service';
import { DemoUserController } from './demoUser.controller';
import { DemoUserService } from './demoUser.service';
import { mockDeep } from 'jest-mock-extended';
import { DemoUser } from '.prisma/client';

describe('DemoUserController', () => {
  let demoUserModuleRef: TestingModule;
  let DemoUserController: DemoUserController;
  let DemoUserService: DemoUserService;
  let prismaService;

  beforeAll(async () => {
    prismaService = mockDeep<PrismaService>();

    // define a Nest custom value provider: https://docs.nestjs.com/fundamentals/custom-providers
    const PrismaServiceProvider = {
      provide: PrismaService,
      useValue: prismaService,
    };

    demoUserModuleRef = await Test.createTestingModule({
      controllers: [DemoUserController],
      providers: [String, DemoUserService, PrismaServiceProvider],
    }).compile();
  });

  beforeEach(async () => {
    DemoUserService = demoUserModuleRef.get<DemoUserService>(DemoUserService);
    prismaService = demoUserModuleRef.get<PrismaService>(PrismaService);
    DemoUserController =
      demoUserModuleRef.get<DemoUserController>(DemoUserController);
  });

  describe('findAll', () => {
    it('should return an array of demos', async () => {
      const demoUser: DemoUser = {
        id: 1,
        name: 'Tesst Record',
        active: false,
        email: 'test@test.com',
        password: 'something',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result: DemoUser[] = [demoUser];

      prismaService.demoUser.findMany.mockResolvedValue(result);

      // since PrismaService is mocked, both controller and respective service class is tested here.
      // No need to mock service class methods
      //jest.spyOn(DemoUserController, 'findAll').mockImplementation(() => result);

      expect(await DemoUserController.findAll()).toBe(result);
    });
  });
});
