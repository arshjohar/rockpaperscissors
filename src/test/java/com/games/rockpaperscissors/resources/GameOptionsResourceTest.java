package com.games.rockpaperscissors.resources;

import com.games.rockpaperscissors.core.GameOption;
import org.junit.Test;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.*;

public class GameOptionsResourceTest {
    private GameOptionsResource gameOptionsResource = new GameOptionsResource();

    @Test
    public void indexReturnsAListOfAllAvailableGameOptions() throws Exception {
        assertThat(gameOptionsResource.index(), is(GameOption.values()));
    }
}