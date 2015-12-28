package com.games.rockpaperscissors.core;

import java.util.Random;

public class RandomGameOptionGenerator {
    private static final GameOption[] ALL_GAME_OPTIONS = GameOption.values();
    private static final Random RANDOM = new Random();

    public GameOption generate() {
        int nextRandomIndex = RANDOM.nextInt(ALL_GAME_OPTIONS.length);
        return ALL_GAME_OPTIONS[nextRandomIndex];
    }
}
