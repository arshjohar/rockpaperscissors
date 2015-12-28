package com.games.rockpaperscissors.core;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

public class GameMatch {
    @Valid
    @NotNull
    private final PlayerSelection firstPlayerSelection;
    @Valid
    @NotNull
    private final PlayerSelection secondPlayerSelection;
    private GameResult gameResult;

    @JsonCreator
    public GameMatch(@JsonProperty("firstPlayerSelection") final PlayerSelection firstPlayerSelection,
                     @JsonProperty("secondPlayerSelection") final PlayerSelection secondPlayerSelection) {
        this.firstPlayerSelection = firstPlayerSelection;
        this.secondPlayerSelection = secondPlayerSelection;
    }

    public PlayerSelection getFirstPlayerSelection() {
        return firstPlayerSelection;
    }

    public PlayerSelection getSecondPlayerSelection() {
        return secondPlayerSelection;
    }

    public void setGameResult(GameResult gameResult) {
        this.gameResult = gameResult;
    }

    public GameResult getGameResult() {
        return gameResult;
    }
}
