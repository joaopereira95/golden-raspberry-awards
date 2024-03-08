package br.com.goldenawards.dto;

public record WinnerProducerData(String producer, Integer interval, Integer previousWin, Integer followingWin) { }
