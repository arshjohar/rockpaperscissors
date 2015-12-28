package com.games.rockpaperscissors.resources;

import com.games.rockpaperscissors.core.*;
import org.junit.Test;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

public class GameMatchesResourceTest {
    private GameMatchesResource gameMatchesResource = new GameMatchesResource();

    @Test
    public void createReturnsAGameMatchWithTheGameResult() throws Exception {
        final PlayerSelection firstPlayerSelection = new PlayerSelection(PlayerType.HUMAN, GameOption.PAPER);
        final PlayerSelection secondPlayerSelection = new PlayerSelection(PlayerType.COMPUTER, GameOption.ROCK);
        final GameMatch gameMatch = new GameMatch(firstPlayerSelection, secondPlayerSelection);

        final GameMatch returnedGameMatch = gameMatchesResource.create(gameMatch);

        assertThat(returnedGameMatch.getFirstPlayerSelection(), is(firstPlayerSelection));
        assertThat(returnedGameMatch.getSecondPlayerSelection(), is(secondPlayerSelection));
        assertThat(returnedGameMatch.getGameResult(), is(GameResult.WIN));
    }
}