import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDto, UpdateMatchDto } from './dto/match.dto';

@Controller('matches')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post()
  createMatch(@Body() createMatchDto: CreateMatchDto) {
    return this.matchService.createMatch(createMatchDto);
  }

  @Get()
  getAllMatches() {
    return this.matchService.getAllMatches();
  }

  @Get('upcoming')
  getUpcomingMatches() {
    return this.matchService.getUpcomingMatches();
  }

  @Get('live')
  getLiveMatches() {
    return this.matchService.getLiveMatches();
  }

  @Get(':id')
  getMatchById(@Param('id') matchId: string) {
    return this.matchService.getMatchById(matchId);
  }

  @Post(':id/start')
  startMatch(@Param('id') matchId: string) {
    return this.matchService.startMatch(matchId);
  }

  @Put(':id/score')
  updateMatchScore(
    @Param('id') matchId: string,
    @Body('scoreFURIA') scoreFURIA: number,
    @Body('scoreOpponent') scoreOpponent: number
  ) {
    return this.matchService.updateMatchScore(matchId, scoreFURIA, scoreOpponent);
  }

  @Post(':id/finish')
  finishMatch(
    @Param('id') matchId: string,
    @Body('scoreFURIA') scoreFURIA: number,
    @Body('scoreOpponent') scoreOpponent: number
  ) {
    return this.matchService.finishMatch(matchId, scoreFURIA, scoreOpponent);
  }

  @Put(':id')
  updateMatch(@Param('id') matchId: string, @Body() updateMatchDto: UpdateMatchDto) {
    return this.matchService.updateMatch(matchId, updateMatchDto);
  }

  @Delete(':id')
  deleteMatch(@Param('id') matchId: string) {
    return this.matchService.deleteMatch(matchId);
  }
}