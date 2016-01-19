package com.games.rockpaperscissors.core;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.dropwizard.jackson.Jackson;
import org.junit.Test;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import java.util.Set;

import static io.dropwizard.testing.FixtureHelpers.fixture;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

public class GameMatchTest {

    private static final ObjectMapper MAPPER = Jackson.newObjectMapper();
    private static final Validator VALIDATOR = Validation.buildDefaultValidatorFactory().getValidator();

    @Test
    public void deserializesFromJson() throws Exception {
        final GameMatch gameMatch = MAPPER.readValue(
                fixture("fixtures/valid_game_match.json"), GameMatch.class);

        PlayerSelection firstPlayerSelection = gameMatch.getFirstPlayerSelection();
        PlayerSelection secondPlayerSelection = gameMatch.getSecondPlayerSelection();
        assertThat(firstPlayerSelection.getGameOption(), is(GameOption.SCISSORS));
        assertThat(firstPlayerSelection.getPlayerType(), is(PlayerType.HUMAN));
        assertThat(secondPlayerSelection.getGameOption(), is(GameOption.ROCK));
        assertThat(secondPlayerSelection.getPlayerType(), is(PlayerType.HUMAN));
        assertThat(gameMatch.getGameResult(), is(GameResult.LOSS));
    }

    @Test
    public void validationProducesConstraintViolationsForNullPlayerSelections() {
        final int expectedNumberOfViolations = 2;
        final GameMatch gameMatch = new GameMatch(null, null);

        final Set<ConstraintViolation<GameMatch>> allConstraintViolations = VALIDATOR.validate(gameMatch);
        final Set<ConstraintViolation<GameMatch>> firstPlayerSelectionConstraintViolations =
                VALIDATOR.validateProperty(gameMatch, "firstPlayerSelection");
        final Set<ConstraintViolation<GameMatch>> secondPlayerSelectionConstraintViolations =
                VALIDATOR.validateProperty(gameMatch, "secondPlayerSelection");

        assertThat(allConstraintViolations.size(), is(expectedNumberOfViolations));
        assertThat(firstPlayerSelectionConstraintViolations.iterator().next().getMessage(), is("may not be null"));
        assertThat(secondPlayerSelectionConstraintViolations.iterator().next().getMessage(), is("may not be null"));
    }

    @Test
    public void validationProducesConstraintViolationsWhenPlayerTypesForAbsentPlayerSelections() {
        final int expectedNumberOfViolations = 2;
        final GameMatch gameMatch =
                new GameMatch(new PlayerSelection(null, null), new PlayerSelection(null, null));

        final Set<ConstraintViolation<GameMatch>> constraintViolations = VALIDATOR.validate(gameMatch);
        final Set<ConstraintViolation<PlayerSelection>> firstPlayerSelectionConstraintViolations =
                VALIDATOR.validateProperty(gameMatch.getFirstPlayerSelection(), "playerType");
        final Set<ConstraintViolation<PlayerSelection>> secondPlayerSelectionConstraintViolations =
                VALIDATOR.validateProperty(gameMatch.getSecondPlayerSelection(), "playerType");

        assertThat(constraintViolations.size(), is(expectedNumberOfViolations));
        assertThat(firstPlayerSelectionConstraintViolations.iterator().next().getMessage(), is("may not be null"));
        assertThat(secondPlayerSelectionConstraintViolations.iterator().next().getMessage(), is("may not be null"));
    }

}
