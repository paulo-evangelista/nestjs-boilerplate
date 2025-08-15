import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateExampleDto {
  @ApiProperty({ description: 'The name of the example', example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The description of the example', example: 'This is a description' })
  @IsString()
  @IsNotEmpty()
  description: string;
}
