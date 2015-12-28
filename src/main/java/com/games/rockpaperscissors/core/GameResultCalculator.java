package com.games.rockpaperscissors.core;

public class GameResultCalculator {

    public GameResult calculate(final GameMatch gameMatch) {
        final GameOption firstPlayerSelection = gameMatch.getFirstPlayerSelection().getGameOption();
        final GameOption secondPlayerSelection = gameMatch.getSecondPlayerSelection().getGameOption();
        final GameResult gameResult;

        if (firstPlayerSelection == secondPlayerSelection) {
            gameResult = GameResult.TIE;
        } else if (firstPlayerSelection.winsOver(secondPlayerSelection)) {
            gameResult = GameResult.WIN;
        } else {
            gameResult = GameResult.LOSS;
        }

        return gameResult;
    }

}
