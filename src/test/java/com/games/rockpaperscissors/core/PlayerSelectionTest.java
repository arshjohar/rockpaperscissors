package com.games.rockpaperscissors.core;


import com.fasterxml.jackson.databind.ObjectMapper;
import io.dropwizard.jackson.Jackson;
import org.junit.Test;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import java.util.Set;

import static io.dropwizard.testing.FixtureHelpers.fixture;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

public class PlayerSelectionTest {

    private static final RandomGameOptionGenerator RANDOM_GAME_OPTION_GENERATOR = new RandomGameOptionGenerator();
    private static final ObjectMapper MAPPER = Jackson.newObjectMapper();
    private static final Validator VALIDATOR = Validation.buildDefaultValidatorFactory().getValidator();

    @Test
    public void deserializesFromJson() throws Exception {
        final PlayerSelection playerSelection =
                MAPPER.readValue(fixture("fixtures/valid_player_selection.json"), PlayerSelection.class);

        assertThat(playerSelection.getGameOption(), is(GameOption.ROCK));
        assertThat(playerSelection.getPlayerType(), is(PlayerType.HUMAN));
    }

    @Test
    public void validationProducesConstraintViolationForNullPlayerType() throws Exception {
        final int expectedNumberOfViolations = 1;
        final PlayerSelection playerSelection = new PlayerSelection(null, GameOption.PAPER);

        final Set<ConstraintViolation<PlayerSelection>> constraintViolations = VALIDATOR.validate(playerSelection);
        final Set<ConstraintViolation<PlayerSelection>> playerTypeConstraintViolations =
                VALIDATOR.validateProperty(playerSelection, "playerType");

        assertThat(constraintViolations.size(), is(expectedNumberOfViolations));
        assertThat(playerTypeConstraintViolations.iterator().next().getMessage(), is("may not be null"));
    }

    @Test
    public void validationProducesNoConstraintViolationsWhenPlayerTypeIsPresent() throws Exception {
        final int expectedNumberOfViolations = 0;
        final PlayerSelection playerSelection = new PlayerSelection(PlayerType.HUMAN, GameOption.PAPER);

        final Set<ConstraintViolation<PlayerSelection>> constraintViolations = VALIDATOR.validate(playerSelection);

        assertThat(constraintViolations.size(), is(expectedNumberOfViolations));
    }

    @Test
    public void getGameOptionReturnsSelectedGameOptionWhenPlayerIsNotComputer() {
        final GameOption selectedGameOption = RANDOM_GAME_OPTION_GENERATOR.generate();
        final PlayerSelection playerSelection = new PlayerSelection(PlayerType.HUMAN, selectedGameOption);

        assertThat(playerSelection.getGameOption(), is(selectedGameOption));
    }

    @Test
    public void getGameOptionGeneratesAndStoresGameOptionForPlayerWhenPlayerIsComputerAndGameOptionIsNull() {
        final PlayerSelection playerSelection = new PlayerSelection(PlayerType.COMPUTER, null);

        final GameOption generatedGameOption = playerSelection.getGameOption();

        assertThat(generatedGameOption, is(notNullValue()));
        assertThat(playerSelection.getGameOption(), is(generatedGameOption));
    }

    @Test
    public void getGameOptionReturnsTheGeneratedGameOptionWhenGameOptionIsAlreadyPresent() {
        final GameOption existingGameOption = GameOption.PAPER;
        final PlayerSelection playerSelection = new PlayerSelection(PlayerType.COMPUTER, existingGameOption);

        assertThat(playerSelection.getGameOption(), is(existingGameOption));
    }

}
