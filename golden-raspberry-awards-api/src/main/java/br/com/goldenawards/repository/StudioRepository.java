package br.com.goldenawards.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.goldenawards.model.Studio;

@Repository
public interface StudioRepository extends JpaRepository<Studio, Long> {

}
