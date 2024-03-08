package br.com.goldenawards.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.goldenawards.dto.WinnersByIntervalSummary;
import br.com.goldenawards.service.MovieService;

@RestController
@RequestMapping("/movies")
public class MovieResource {

	private @Autowired MovieService service;

	@GetMapping(params = "projection=max-min-win-interval-for-producers")
	public WinnersByIntervalSummary findMaxMinIntervalForProducers() {
		return service.getMaxMinIntervalForWorstMovieProducers();
	}
}
