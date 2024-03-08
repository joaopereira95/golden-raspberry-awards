package br.com.goldenawards.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.goldenawards.dto.WinnerProducerData;
import br.com.goldenawards.dto.WinnerProducerPerYear;
import br.com.goldenawards.dto.WinnersByIntervalSummary;
import br.com.goldenawards.enums.WinIntervalCondition;
import br.com.goldenawards.repository.MovieRepository;

@Service
public class MovieService {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(MovieService.class);

	private @Autowired MovieRepository movieRepository;
	
	/**
	 * It returns the minimum and maximum years range in which a producer won the worst film award
	 * @return min and max years range
	 */
	public WinnersByIntervalSummary getMaxMinIntervalForWorstMovieProducers() {
		var winners = movieRepository.findWinningProducers();
		
		LOGGER.debug("[MovieService][getMaxMinIntervalForWorstMovieProducers] Winners: {}", winners);
		
		var groupedWinnersByYear = groupWinnersByYear(winners);
		
		LOGGER.debug("[MovieService][getMaxMinIntervalForWorstMovieProducers] Winners grouped by year: {}", groupedWinnersByYear);
		
		var calculatedIntervalData = calculateIntervalData(groupedWinnersByYear);
		
		LOGGER.debug("[MovieService][getMaxMinIntervalForWorstMovieProducers] Calculated interval data: {}", calculatedIntervalData);

		var summary = summarizeData(calculatedIntervalData);
		
		LOGGER.debug("[MovieService][getMaxMinIntervalForWorstMovieProducers] Summarized data: {}", summary);
		
		return summary;
		
	}
	
	/**
	 * It summarize the calculated data into a single WinnersByIntervalSummary object
	 * @param calculatedData
	 * @return summarized data
	 */
	private static WinnersByIntervalSummary summarizeData(List<WinnerProducerData> calculatedData) {
		var max = getExtremeInterval(calculatedData, WinIntervalCondition.MAX);
		var min = getExtremeInterval(calculatedData, WinIntervalCondition.MIN);
		
		return new WinnersByIntervalSummary(min, max);
		
	}
	
	/**
	 * It gets the min or max values from List<WinnerProducerData>
	 * @param calculatedData
	 * @param intervalCondition
	 * @return min or max object
	 */
	private static List<WinnerProducerData> getExtremeInterval(List<WinnerProducerData> calculatedData, WinIntervalCondition intervalCondition) {
        Integer extremeInterval = calculatedData.stream()
                .map(WinnerProducerData::interval)
                .distinct()
                .sorted(WinIntervalCondition.MIN.equals(intervalCondition) ? Comparator.naturalOrder() : Comparator.reverseOrder())
                .findFirst()
                .orElse(0);

        return calculatedData.stream()
                .filter(data -> data.interval().equals(extremeInterval))
                .collect(Collectors.toList());
    }

	/**
	 * It groups a List<WinnerProducerPerYear> into a Map<String, List<Integer>> containing the Winner names and theirs Winner years
	 * @param winnersPerYear
	 * @return grouped data
	 */
	private static Map<String, List<Integer>> groupWinnersByYear(List<WinnerProducerPerYear> winnersPerYear) {
		return winnersPerYear.stream()
                .collect(Collectors.groupingBy(WinnerProducerPerYear::producerName,
                        Collectors.mapping(WinnerProducerPerYear::movieYear, Collectors.toList())));
	}

	
	/**
	 * It converts the Map<String, List<Integer>> into a List of WinnerProducerData
	 * @param groupedWinnersPerYear
	 * @return List data
	 */
	private static List<WinnerProducerData> calculateIntervalData(Map<String, List<Integer>> groupedWinnersPerYear) {
		return groupedWinnersPerYear.entrySet().stream()
				 .filter(entry -> entry.getValue().size() > 1)
				 .map(entry -> calculateIntervalsData(entry.getKey(), entry.getValue()))
				 .flatMap(List::stream)
				 .collect(Collectors.toList());
	}
	
	/**
	 * It calculates the Min and Max interval data and returns a List
	 * @param producer
	 * @param years
	 * @return Min and Max interval data List
	 */
	private static List<WinnerProducerData> calculateIntervalsData(String producer, List<Integer> years) {
		var data = new ArrayList<WinnerProducerData>();
		
		var maxIntervalData = calculateInterval(producer, years, WinIntervalCondition.MAX);
		
		data.add(maxIntervalData);
		
		if (years.size() == 2) {
			return data;
		}
		
		var minIntervalData = calculateInterval(producer, years, WinIntervalCondition.MIN);
		data.add(minIntervalData);
		 
		return data;
		
	}
	
	/**
	 * It gets the Min or Max interval data
	 * @param producer
	 * @param years
	 * @param intervalCondition
	 * @return Min or Max interval data
	 */
	private static WinnerProducerData calculateInterval(String producer, List<Integer> years, WinIntervalCondition intervalCondition) {
        int intervalInitValue = WinIntervalCondition.MIN.equals(intervalCondition) ? Integer.MAX_VALUE : 0;
        int previousWin = years.get(0);
        int followingWin = years.get(1);

        for (int i = 1; i < years.size(); i++) {
            int currentInterval = years.get(i) - years.get(i - 1);
            
            boolean condition = WinIntervalCondition.MIN.equals(intervalCondition) 
            		? currentInterval < intervalInitValue 
            		: currentInterval > intervalInitValue;
            		
            if (condition) {
                intervalInitValue = currentInterval;
                previousWin = years.get(i - 1);
                followingWin = years.get(i);
            }
        }

        return new WinnerProducerData(producer, intervalInitValue, previousWin, followingWin);
    }
	
}
