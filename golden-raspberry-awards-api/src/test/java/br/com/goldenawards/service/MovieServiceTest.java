package br.com.goldenawards.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import br.com.goldenawards.Constants;

@SpringBootTest
@ActiveProfiles("test")
public class MovieServiceTest {

	private @Autowired MovieService movieService;
	
	@Test
	public void shouldGetCorrectObject() {
		var result = movieService.getMaxMinIntervalForWorstMovieProducers();
		
		assertNotNull(result);
		
		assertEquals(Constants.EXPECTED_MIN_PRODUCER, result.min().get(0).producer());
    	assertEquals(Constants.EXPECTED_MIN_INTERVAL, result.min().get(0).interval());
    	assertEquals(Constants.EXPECTED_MIN_PREVIOUS_WIN, result.min().get(0).previousWin());
    	assertEquals(Constants.EXPECTED_MIN_FOLLOWING_WIN, result.min().get(0).followingWin());
    	
    	assertEquals(Constants.EXPECTED_MAX_PRODUCER, result.max().get(0).producer());
    	assertEquals(Constants.EXPECTED_MAX_INTERVAL, result.max().get(0).interval());
    	assertEquals(Constants.EXPECTED_MAX_PREVIOUS_WIN, result.max().get(0).previousWin());
    	assertEquals(Constants.EXPECTED_MAX_FOLLOWING_WIN, result.max().get(0).followingWin());
	}
	
}
