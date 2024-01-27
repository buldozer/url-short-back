import { Module } from '@nestjs/common';
import { ShortenerController } from './controllers/shortener/shortener.controller';
import { ShortenerService } from './services/shortener/shortener.service';

@Module({
  controllers: [ShortenerController],
  providers: [ShortenerService]
})
export class ShortenerModule {}
