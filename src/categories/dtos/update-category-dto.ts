import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  descryption: string;

  @IsArray()
  @ArrayMinSize(1)
  events: Array<Event>;
}
