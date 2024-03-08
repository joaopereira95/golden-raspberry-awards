package br.com.goldenawards.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.goldenawards.model.Producer;

@Repository
public interface ProducerRepository extends JpaRepository<Producer, Long> {

}
