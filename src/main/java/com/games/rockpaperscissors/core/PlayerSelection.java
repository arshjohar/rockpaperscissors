package com.games.rockpaperscissors.core;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;

public class PlayerSelection {
    private static final RandomGameOptionGenerator RANDOM_GAME_OPTION_GENERATOR = new RandomGameOptionGenerator();

    @NotNull
    private final PlayerType playerType;
    private GameOption gameOption;

    @JsonCreator
    public PlayerSelection(@JsonProperty("playerType") final PlayerType playerType,
                           @JsonProperty("gameOption") GameOption gameOption) {
        this.playerType = playerType;
        this.gameOption = gameOption;
    }

    public PlayerType getPlayerType() {
        return playerType;
    }

    public GameOption getGameOption() {
        if (this.getPlayerType() == PlayerType.COMPUTER && this.gameOption == null) {
            this.gameOption = RANDOM_GAME_OPTION_GENERATOR.generate();
        }
        return gameOption;
    }
}
