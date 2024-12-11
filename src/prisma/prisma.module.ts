import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CommonModule } from 'src/common/common.module';

@Module({
    imports: [CommonModule],
    exports: [PrismaService],
    providers: [PrismaService]
})
export class PrismaModule { }
