package com.games.rockpaperscissors.core;

import org.junit.Test;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.*;

public class GameResultCalculatorTest {

    @Test
    public void calculateReturnsATieIfBothPlayersSelectTheSameOption() {
        final PlayerSelection firstPlayerSelection = new PlayerSelection(PlayerType.HUMAN, GameOption.ROCK);
        final PlayerSelection secondPlayerSelection = new PlayerSelection(PlayerType.HUMAN, GameOption.ROCK);
        final GameMatch gameMatch = new GameMatch(firstPlayerSelection, secondPlayerSelection);
        final GameResultCalculator gameResultCalculator = new GameResultCalculator();

        assertThat(gameResultCalculator.calculate(gameMatch), is(GameResult.TIE));
    }

    @Test
    public void calculateReturnsAWinIfFirstPlayerWinsOverSecondPlayer() {
        final PlayerSelection firstPlayerSelection = new PlayerSelection(PlayerType.HUMAN, GameOption.ROCK);
        final PlayerSelection secondPlayerSelection = new PlayerSelection(PlayerType.HUMAN, GameOption.SCISSORS);
        final GameMatch gameMatch = new GameMatch(firstPlayerSelection, secondPlayerSelection);
        final GameResultCalculator gameResultCalculator = new GameResultCalculator();

        assertThat(gameResultCalculator.calculate(gameMatch), is(GameResult.WIN));
    }

    @Test
    public void calculateReturnsAWinIfFirstPlayerLosesToSecondPlayer() {
        final PlayerSelection firstPlayerSelection = new PlayerSelection(PlayerType.HUMAN, GameOption.ROCK);
        final PlayerSelection secondPlayerSelection = new PlayerSelection(PlayerType.HUMAN, GameOption.PAPER);
        final GameMatch gameMatch = new GameMatch(firstPlayerSelection, secondPlayerSelection);
        final GameResultCalculator gameResultCalculator = new GameResultCalculator();

        assertThat(gameResultCalculator.calculate(gameMatch), is(GameResult.LOSS));
    }



}