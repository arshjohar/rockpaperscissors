package com.games.rockpaperscissors;

import com.games.rockpaperscissors.resources.GameMatchesResource;
import com.games.rockpaperscissors.resources.GameOptionsResource;
import io.dropwizard.Application;
import io.dropwizard.assets.AssetsBundle;
import io.dropwizard.jersey.setup.JerseyEnvironment;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;

public class RockPaperScissorsApplication extends Application<RockPaperScissorsConfiguration> {

    public static void main(String[] args) throws Exception {
        new RockPaperScissorsApplication().run(args);
    }

    @Override
    public void initialize(Bootstrap<RockPaperScissorsConfiguration> bootstrap) {
        bootstrap.addBundle(new AssetsBundle("/assets", "/", "index.html"));
    }

    @Override
    public void run(RockPaperScissorsConfiguration rockPaperScissorsConfiguration, Environment environment) {
        final GameOptionsResource gameOptionsResource = new GameOptionsResource();
        final GameMatchesResource gameMatchesResource = new GameMatchesResource();

        final JerseyEnvironment jerseyEnvironment = environment.jersey();
        jerseyEnvironment.register(gameOptionsResource);
        jerseyEnvironment.register(gameMatchesResource);
    }
}
