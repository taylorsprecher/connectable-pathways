import { Module } from '@nestjs/common';
import { PathwaysModule } from './pathways/pathways.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [PathwaysModule],
  providers: [PrismaService],
})
export class AppModule {}
