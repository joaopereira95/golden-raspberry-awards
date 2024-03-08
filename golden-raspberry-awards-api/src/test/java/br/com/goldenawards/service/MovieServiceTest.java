package br.com.goldenawards.service;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class MovieServiceTest {

	private @Autowired MovieService movieService;
	
	@Test
	public void shouldGetCorrectObject() {
		var result = movieService.getMaxMinIntervalForWorstMovieProducers();
		assertNotNull(result);
	}
	
}
