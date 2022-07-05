import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AppDto {

  @IsArray()
  @IsNumber({ allowNaN: false }, { each: true })
  @ArrayMinSize(1)
  public input: number[];
}