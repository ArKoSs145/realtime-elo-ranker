import { Body, Controller, Post } from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './create-player.dto';

@Controller('api/player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  create(@Body() dto: CreatePlayerDto) {
    return this.playerService.create(dto.id);
  }
}
