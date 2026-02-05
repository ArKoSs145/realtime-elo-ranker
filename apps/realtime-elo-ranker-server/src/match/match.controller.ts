import { Body, Controller, Post } from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDto } from './create-match.dto';

@Controller('api/match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post()
  recordMatch(@Body() dto: CreateMatchDto) {
    return this.matchService.recordMatch(dto);
  }
}
