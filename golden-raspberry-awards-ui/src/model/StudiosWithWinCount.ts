export interface StudiosWithWinCount {
    studios: StudioWithWinCount[];
}

interface StudioWithWinCount {
    name: string;
    winCount: number;
}