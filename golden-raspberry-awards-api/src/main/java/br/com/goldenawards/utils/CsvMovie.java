package br.com.goldenawards.utils;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import com.opencsv.bean.CsvBindByName;

import br.com.goldenawards.model.Movie;
import br.com.goldenawards.model.Producer;
import br.com.goldenawards.model.Studio;

public class CsvMovie {
	
	private static final String REGEXP_LIST_COLUMN = ",\\s*(?:and\\b)?|\\band\\b";

	@CsvBindByName(column = "year")
	private Integer year;

	@CsvBindByName(column = "title")
	private String title;

	@CsvBindByName(column = "studios")
	private String studios;

	@CsvBindByName(column = "producers")
	private String producers;

	@CsvBindByName(column = "winner")
	private String winner;

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getStudios() {
		return studios;
	}

	public void setStudios(String studios) {
		this.studios = studios;
	}

	public String getProducers() {
		return producers;
	}

	public void setProducers(String producers) {
		this.producers = producers;
	}

	public String getWinner() {
		return winner;
	}

	public void setWinner(String winner) {
		this.winner = winner;
	}
	
	public Movie toMovie(List<Producer> existingProducers, List<Studio> existingStudios) {
		var producersList = convertStringToList(producers, REGEXP_LIST_COLUMN).stream().map(producer -> getOrAddProducer(existingProducers, producer)).collect(Collectors.toList());
		var studiosList = convertStringToList(studios, REGEXP_LIST_COLUMN).stream().map(studio -> getOrAddStudio(existingStudios, studio)).collect(Collectors.toList());
		return new Movie(title, year, winner, producersList, studiosList); 
	}
	
	private static Studio getOrAddStudio(List<Studio> existingStudios, String studioName) {
		
		var addedStudio = new Studio(studioName);
		
		if (existingStudios.contains(addedStudio)) {
			var studioIndex = existingStudios.indexOf(addedStudio);
			return existingStudios.get(studioIndex);
		}
		
		existingStudios.add(addedStudio);
		
		return addedStudio;
	}
	
	private static Producer getOrAddProducer(List<Producer> existingProducers, String producerName) {
		
		var newProducer = new Producer(producerName);
		
		if (existingProducers.contains(newProducer)) {
			var producerIndex = existingProducers.indexOf(newProducer);
			return existingProducers.get(producerIndex);
		}
		
		existingProducers.add(newProducer);
		
		return newProducer;
	}
	
	private static List<String> convertStringToList(String data, String splitRegexp) {
		return Arrays.asList(data
				.split(splitRegexp))
				.stream().map(String::trim)
				.collect(Collectors.toList());
	}

	@Override
	public String toString() {
		return "MovieListCsvBean [year=" + year + ", title=" + title + ", studios=" + studios + ", producers="
				+ producers + ", winner=" + winner + "]";
	}

}
