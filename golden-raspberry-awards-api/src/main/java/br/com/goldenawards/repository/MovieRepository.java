package br.com.goldenawards.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.goldenawards.dto.WinnerProducerPerYear;
import br.com.goldenawards.model.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {

	@Query(nativeQuery = true)
	List<WinnerProducerPerYear> findWinningProducers();
}
