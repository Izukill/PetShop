import { Test, TestingModule } from '@nestjs/testing';
import { TipoServicoService } from './tipo-servico.service';

describe('TipoServicoService', () => {
  let service: TipoServicoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoServicoService],
    }).compile();

    service = module.get<TipoServicoService>(TipoServicoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
