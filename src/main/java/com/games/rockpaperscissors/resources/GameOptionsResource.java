package com.games.rockpaperscissors.resources;

import com.games.rockpaperscissors.core.GameOption;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/gameOptions")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class GameOptionsResource {
    @GET
    public GameOption[] index() {
        return GameOption.values();
    }
}
