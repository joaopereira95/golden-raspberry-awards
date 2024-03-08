package br.com.goldenawards.dto;

import java.util.List;

public record WinnersByIntervalSummary(List<WinnerProducerData> min, List<WinnerProducerData> max) { }
