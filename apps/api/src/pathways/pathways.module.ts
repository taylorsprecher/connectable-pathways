import { Module } from '@nestjs/common';
import { PathwaysController } from './pathways.controller';
import { PathwaysService } from './pathways.service';
import { GraphValidatorService } from './graph-validator.service';
import { ExecutionService } from './execution.service';

@Module({
  controllers: [PathwaysController],
  providers: [PathwaysService, GraphValidatorService, ExecutionService],
})
export class PathwaysModule {}
