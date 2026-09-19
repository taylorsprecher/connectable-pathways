import { IsArray, IsOptional, IsString, IsNumber, IsObject } from 'class-validator';

export class CreatePathwayDto {
  @IsString()
  workspaceId: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  nodes?: any[];

  @IsOptional()
  @IsArray()
  edges?: any[];
}

export class AddNodeDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  type: string;

  @IsString()
  label: string;

  @IsNumber()
  x: number;

  @IsNumber()
  y: number;

  @IsOptional()
  @IsArray()
  inputPorts?: string[];

  @IsOptional()
  @IsArray()
  outputPorts?: string[];

  @IsOptional()
  @IsObject()
  config?: Record<string, any>;
}

export class AddEdgeDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  fromNodeId: string;

  @IsString()
  fromPortId: string;

  @IsString()
  toNodeId: string;

  @IsString()
  toPortId: string;

  @IsOptional()
  @IsString()
  condition?: string;
}
