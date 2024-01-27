import { Test, TestingModule } from '@nestjs/testing';
import { ShortenerController } from './shortener.controller';
import { ShortenerService } from 'src/shortener/services/shortener/shortener.service';

describe('ShortenerController', () => {
  let controller: ShortenerController;
  let service: ShortenerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShortenerController],
      providers: [ShortenerService],
    }).compile();

    controller = module.get<ShortenerController>(ShortenerController);
    service = module.get<ShortenerService>(ShortenerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call ShortenerService.shrinkUrl with the correct argument', () => {
    const originalUrl = 'http://example.com';
    const spy = jest.spyOn(service, 'shrinkUrl');

    controller.create({ url: originalUrl });

    expect(spy).toHaveBeenCalledWith(originalUrl);
  });

});
