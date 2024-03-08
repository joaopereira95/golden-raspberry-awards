package br.com.goldenawards.dto;

import java.util.List;

import br.com.goldenawards.model.Producer;
import br.com.goldenawards.model.Studio;

public record MovieData (List<Producer> producers, List<Studio> studios) { }