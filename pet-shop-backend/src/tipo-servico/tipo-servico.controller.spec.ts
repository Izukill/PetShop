import { Test, TestingModule } from '@nestjs/testing';
import { TipoServicoController } from './tipo-servico.controller';
import { TipoServicoService } from './tipo-servico.service';

describe('TipoServicoController', () => {
  let controller: TipoServicoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoServicoController],
      providers: [TipoServicoService],
    }).compile();

    controller = module.get<TipoServicoController>(TipoServicoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
