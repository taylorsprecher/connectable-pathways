import { Module } from '@nestjs/common';
import { HealthController } from './health/health.controller';
import { PathwaysModule } from './pathways/pathways.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [PathwaysModule],
  controllers: [HealthController],
  providers: [PrismaService],
})
export class AppModule {}
