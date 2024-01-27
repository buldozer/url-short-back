import { Controller, Post, Body, Redirect, Get, Param, Req, HttpException, HttpStatus } from '@nestjs/common';
import { ShortenerService } from 'src/shortener/services/shortener/shortener.service';
import { ApiBody, ApiExtraModels, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateURLDto } from 'src/shortener/dto/create-url.dto';

@Controller('/')
@ApiTags('Shorten URL') // Added Swagger tags
export class ShortenerController {

    constructor(private shortenerService: ShortenerService){

    }

    @Post('create')
    @ApiResponse({
        status: 201, 
        description: 'Generated short URL.',
        schema: {
            type: 'string',
            default: "http://localhost:3000/64f8a6defe298c20bd2bf8491b263223"
          }
    })
    @ApiProduces('text/plain')
    async create(@Body() data: CreateURLDto): Promise<string>
    {
        console.log(data);
        
        if (!data || !data.url) {
            throw new HttpException("Missing 'url' parameter in Body JSON", HttpStatus.BAD_REQUEST);
        }
        const originalUrl = data.url.trim();
        console.log(`Received URL: ${originalUrl}`);

        try {
            const shortenedUrl = await this.shortenerService.shrinkUrl(originalUrl);
            console.log(`Shortened URL: ${shortenedUrl}`);
            return shortenedUrl;
        } catch (error) {
            console.error(`Error during URL shortening: ${error.message}`);
            throw new HttpException('Invalid URL or DNS lookup failed', HttpStatus.BAD_REQUEST);
        } 
        //return await this.shortenerService.shrinkUrl(originalUrl);
    }



    @Get(':code')
    @ApiParam({ name: 'code', description: 'Shortened code to be redirected' })
    @ApiProduces('text/plain')
    @Redirect()
    redirectToOriginalUrl(@Param('code') code: string): { url: string } 
    {
        if (!code ) {
            throw new HttpException("Missing 'url' parameter in Body JSON", HttpStatus.BAD_REQUEST);
        }

        const originalUrl = this.shortenerService.getOriginalUrl(code);
        return { "url": originalUrl };
    }
}

