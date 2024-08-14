import { Test, TestingModule } from '@nestjs/testing';
import { TechnologiesService } from './technologies.service';
import { TechnologiesRepository, TechnologyPayload } from './technologies.repository';

describe('TechnologiesService', () => {
  let service: TechnologiesService;
  let repository: TechnologiesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TechnologiesService,
        {
          provide: TechnologiesRepository,
          useValue: {
            getList: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TechnologiesService>(TechnologiesService);
    repository = module.get<TechnologiesRepository>(TechnologiesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a list of technologies', async () => {
    const mockTechnologies = {
      backLangs: [],
      backFrameworks: [],
      frontLangs: [],
      frontFrameworks: [],
      databaseLanguages: []
    };

    const getListMock = repository.getList as jest.Mock<Promise<TechnologyPayload>>;
    getListMock.mockResolvedValue(mockTechnologies);

    const result = await service.getList();

    expect(result).toBe(mockTechnologies);
    expect(repository.getList).toHaveBeenCalled();
  });
});
