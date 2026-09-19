import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { PathwaysService } from './pathways.service';

@Controller('pathways')
export class PathwaysController {
  constructor(private readonly pathwaysService: PathwaysService) {}

  @Post()
  create(@Body() dto: any) {
    return this.pathwaysService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pathwaysService.findOne(id);
  }

  @Post(':id/nodes')
  addNode(@Param('id') id: string, @Body() node: any) {
    return this.pathwaysService.addNode(id, node);
  }

  @Post(':id/edges')
  addEdge(@Param('id') id: string, @Body() edge: any) {
    return this.pathwaysService.addEdge(id, edge);
  }

  @Post(':id/validate')
  validate(@Param('id') id: string) {
    return this.pathwaysService.validate(id);
  }

  @Post(':id/run')
  run(@Param('id') id: string, @Body() body: Record<string, any>) {
    return this.pathwaysService.run(id, body || {});
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.pathwaysService.delete(id);
  }
}
