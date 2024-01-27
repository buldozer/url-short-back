import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as dns from 'dns'; 


@Injectable()
export class ShortenerService {

    private urls: Map<string, string> = new Map();


    async shrinkUrl(originalUrl: string): Promise<string> 
    {
        /*if (!isValidUrl(originalUrl)) {
          throw new Error('Invalid URL');
        }*/
        try {
          //const dns = require('dns');
          await this.performDnsLookup(originalUrl);
        } catch (error) {
          throw new HttpException('Invalid URL or DNS lookup failed', HttpStatus.BAD_REQUEST);
        }


        const code = this.generateHash(originalUrl);

        this.urls.set(code, originalUrl);
    
        return `http://localhost:3000/${code}`;
      }
    
      getOriginalUrl(code: string): string 
      {
        console.log(code);
        console.log(this.urls);

        const originalUrl = this.urls.get(code);
        if (!originalUrl) {
            throw new HttpException("Hash not found", HttpStatus.NOT_FOUND);
        }
        return originalUrl as string;
      }
    
      private generateHash( originalUrl: string): string 
      {
        const crypto = require('crypto');
        let hash = crypto.createHash('md5').update(originalUrl).digest("hex");
        //hash = hash.substring(6);
        return  hash;
      }

      private performDnsLookup(url: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const hostname = new URL(url).hostname;
            dns.lookup(hostname, (err) => {
                console.log(`Performing DNS lookup for ${hostname}`);
                if (err) {
                    console.error(`DNS lookup failed: ${err.message}`);
                    reject(err);
                } else {
                    console.log('DNS lookup successful');
                    resolve();
                }
            });
        });
    }

}
