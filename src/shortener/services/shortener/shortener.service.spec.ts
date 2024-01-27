import { Test, TestingModule } from '@nestjs/testing';
import { ShortenerService } from './shortener.service';

describe('ShortenerService', () => {
  let service: ShortenerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShortenerService],
    }).compile();

    service = module.get<ShortenerService>(ShortenerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate a shortened URL', () => {
    const originalUrl = 'http://cnn.com';
    const shortenedUrl = service.shrinkUrl(originalUrl);
    expect(shortenedUrl).toContain('http://localhost:3000/');
  });

  it('should retrieve the original URL', () => {
    const originalUrl = 'http://cnn.com';
    const shortenedUrl = service.shrinkUrl(originalUrl);
    const retrievedUrl = service.getOriginalUrl(shortenedUrl.split('/').pop()!);
    expect(retrievedUrl).toBe(originalUrl);
  });

});
