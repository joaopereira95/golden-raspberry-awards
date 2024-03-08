package br.com.goldenawards.runner;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import br.com.goldenawards.model.Movie;
import br.com.goldenawards.model.Producer;
import br.com.goldenawards.model.Studio;
import br.com.goldenawards.repository.MovieRepository;
import br.com.goldenawards.repository.ProducerRepository;
import br.com.goldenawards.repository.StudioRepository;
import br.com.goldenawards.utils.CsvMovie;
import br.com.goldenawards.utils.CsvUtils;

@Component
public class ImportDataRunner implements CommandLineRunner {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ImportDataRunner.class);
	
	private @Autowired StudioRepository studioRepository;
	private @Autowired ProducerRepository producerRepository;
	private @Autowired MovieRepository movieRepository;
	
	@Override
	public void run(String... args) {
		LOGGER.debug("[ImportDataRunner][run] Starting CSV import...");
		var csvMovies = getMoviesFromCsvFile();
		
		LOGGER.debug("[ImportDataRunner][run] CSV movies: {}", csvMovies);
		
		insertData(csvMovies);
	}
	
	/**
	 * It converts a CsvMovie List to Movie List and persists on the database
	 * @param csvMovies
	 */
	private void insertData(List<CsvMovie> csvMovies) {
		LOGGER.debug("[ImportDataRunner][insertData] Starting database insert...");
		
		var movies = convertCsvMoviesToObjectList(csvMovies);
		LOGGER.debug("[ImportDataRunner][insertData] Converted CsvMovie list to Movie list: {}", movies);
		
		var studios = movies.stream().map(Movie::getStudios).flatMap(Collection::stream).distinct().toList();
		LOGGER.debug("[ImportDataRunner][insertData] Studios list: {}", studios);
		
		var producers = movies.stream().map(Movie::getProducers).flatMap(Collection::stream).distinct().toList();
		LOGGER.debug("[ImportDataRunner][insertData] Producers list: {}", producers);
		
		studioRepository.saveAll(studios);
		producerRepository.saveAll(producers);
		movieRepository.saveAll(movies);
		
		LOGGER.debug("[ImportDataRunner][insertData] Persisted Movie list: {}", movies);
		LOGGER.debug("[ImportDataRunner][insertData] Persisted Studio list: {}", studios);
		LOGGER.debug("[ImportDataRunner][insertData] Persisted Producer list: {}", producers);
		
		LOGGER.debug("[ImportDataRunner][insertData] Objects successfuly inserted on database");
	}
	
	/**
	 * It gets the movies from CSV file and converts to CsvMovie List beans
	 * @return CsvMovie List
	 */
	private static List<CsvMovie> getMoviesFromCsvFile() {
		LOGGER.debug("[ImportDataRunner][getMoviesFromCsvFile] Getting movies from CSV file...");
		
		try {
			return CsvUtils.convertCsvFileToCsvMovieList();
			
		} catch (IOException e) {
			LOGGER.error("[ImportDataRunner][getMoviesFromCsvFile] Error on getting movies from CSV file", e);
			return List.of();
		}
		 
	}
	
	/**
	 * It converts the CsvMovie List to Movie List
	 * @param beans
	 * @return Movie List
	 */
	private static List<Movie> convertCsvMoviesToObjectList(List<CsvMovie> beans) {
		var existingStudios = new ArrayList<Studio>();
		var existingProducers = new ArrayList<Producer>();
		
		var movies = beans.stream()
				.map(movieBean -> movieBean.toMovie(existingProducers, existingStudios))
				.collect(Collectors.toList());
		
		return movies;
		
	}
}
