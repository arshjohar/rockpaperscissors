package com.games.rockpaperscissors.core;

import org.junit.Test;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.*;

public class GameOptionTest {

    @Test
    public void winsOverReturnsTrueForRockOverScissors() {
        assertThat(GameOption.ROCK.winsOver(GameOption.SCISSORS), is(true));
    }

    @Test
    public void winsOverReturnsTrueForPaperOverRock() {
        assertThat(GameOption.PAPER.winsOver(GameOption.ROCK), is(true));
    }

    @Test
    public void winsOverReturnsTrueForScissorsOverPaper() {
        assertThat(GameOption.SCISSORS.winsOver(GameOption.PAPER), is(true));
    }
}