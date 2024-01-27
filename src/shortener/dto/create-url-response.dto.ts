import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { IsString } from "class-validator";


export class CreateURLResponseDto {

    @ApiProperty({example:"http://localhost:3000/64f8a6defe298c20bd2bf8491b263223"})
    @IsString()
    url: string;
  }