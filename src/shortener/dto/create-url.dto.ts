import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUrl } from "class-validator";


export class CreateURLDto {
    @ApiProperty({default: "http://cnn.com"})
    @IsNotEmpty({ message: 'URL should not be empty' })
    @IsString({ message: 'URL should be a string' })
    @IsUrl({}, { message: 'Invalid URL format' })
    url: string;
  }