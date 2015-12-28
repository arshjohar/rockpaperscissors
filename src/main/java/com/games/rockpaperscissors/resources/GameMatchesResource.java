package com.games.rockpaperscissors.resources;

import com.games.rockpaperscissors.core.GameMatch;
import com.games.rockpaperscissors.core.GameResult;
import com.games.rockpaperscissors.core.GameResultCalculator;

import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/gameMatches")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class GameMatchesResource {

    @POST
    public GameMatch create(@Valid final GameMatch gameMatch) {
        GameResult gameResult = new GameResultCalculator().calculate(gameMatch);
        gameMatch.setGameResult(gameResult);

        return gameMatch;
    }

}
