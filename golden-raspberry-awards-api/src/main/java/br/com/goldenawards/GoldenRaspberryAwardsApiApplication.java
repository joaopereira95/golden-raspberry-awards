package br.com.goldenawards;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import br.com.goldenawards.runner.ImportDataRunner;

@SpringBootApplication
public class GoldenRaspberryAwardsApiApplication {
	
	@Bean
	ImportDataRunner importDataRunner() {
		return new ImportDataRunner();
	}

	public static void main(String[] args) {
		SpringApplication.run(GoldenRaspberryAwardsApiApplication.class, args);
	}

}
