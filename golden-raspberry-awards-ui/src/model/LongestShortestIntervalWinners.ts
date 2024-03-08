export interface LongestShortestIntervalWinners {
    min: ProducerIntervalData[];
    max: ProducerIntervalData[];
}

interface ProducerIntervalData {
    producer: string;
    interval: number;
    previousWin: number;
    followingWin: number;
}