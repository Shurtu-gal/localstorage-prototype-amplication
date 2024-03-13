import { ApiProperty } from "@nestjs/swagger";

export class FileDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  filename!: string;

  @ApiProperty()
  mimetype!: string;

  @ApiProperty()
  encoding!: string;

  @ApiProperty()
  size?: number;

  @ApiProperty()
  metadata?: Record<string, any>;
}