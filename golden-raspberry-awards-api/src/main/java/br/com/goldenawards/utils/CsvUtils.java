package br.com.goldenawards.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;

import com.opencsv.bean.CsvToBeanBuilder;

public final class CsvUtils {

	private CsvUtils() {
		super();
	}

	public static List<CsvMovie> convertCsvFileToCsvMovieList() throws IOException {

		try (var inputStream = CsvUtils.class.getResourceAsStream("/data/movielist.csv");
				var reader = new BufferedReader(new InputStreamReader(inputStream))) {

			var csvToBean = new CsvToBeanBuilder<CsvMovie>(reader).withSeparator(';')
					.withType(CsvMovie.class).build();

			return csvToBean.parse();

		}

	}

}
