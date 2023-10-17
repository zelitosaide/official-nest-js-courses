// import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive } from "class-validator";

export class PaginationQueryDto {
  // @Type(() => Number)
  @IsOptional()
  @IsPositive()
  limit: number;

  // @Type(() => Number)
  @IsOptional()
  @IsPositive()
  offset: number;
}
