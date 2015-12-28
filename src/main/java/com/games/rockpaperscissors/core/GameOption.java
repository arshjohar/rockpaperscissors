package com.games.rockpaperscissors.core;

public enum GameOption {
    ROCK, PAPER, SCISSORS;

    private GameOption winsOver;

    static {
        ROCK.winsOver = SCISSORS;
        PAPER.winsOver = ROCK;
        SCISSORS.winsOver = PAPER;
    }

    public boolean winsOver(GameOption gameOption) {
        return this.winsOver == gameOption;
    }

}
