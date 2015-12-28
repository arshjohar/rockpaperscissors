package com.games.rockpaperscissors.core;

import org.junit.Test;

import java.util.Arrays;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.*;

public class RandomGameOptionGeneratorTest {

    @Test
    public void generatesARandomGameOption() {
        int numberOfGameOptions = 10;
        RandomGameOptionGenerator randomGameOptionGenerator = new RandomGameOptionGenerator();
        GameOption[] randomGameOptions = new GameOption[numberOfGameOptions];

        for (int i = 0; i < numberOfGameOptions; i++) {
            randomGameOptions[i] = randomGameOptionGenerator.generate();
        }

        GameOption[] uniqueGameOptions = Arrays.stream(randomGameOptions).distinct().toArray(GameOption[]::new);

        assertThat((uniqueGameOptions.length > 1), is(true));
    }

}