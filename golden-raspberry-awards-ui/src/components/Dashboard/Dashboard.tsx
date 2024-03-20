/** React imports */
import { useEffect, useState } from "react";

/** Custom imports */
import { LongestShortestIntervalWinners } from "../../model/LongestShortestIntervalWinners";
import { StudiosWithWinCount } from "../../model/StudiosWithWinCount";
import { MovieWinnerByYear } from "../../model/MovieWinnersByYear";
import { MultipleWinners } from "../../model/MultipleWinners";

import YearsWithMultipleWinnersCard from "./Cards/YearsWithMultipleWinnersCard";
import TopThreeStudiosCard from "./Cards/TopThreeStudiosCard";
import ExtremeIntervalWinnersCard from "./Cards/ExtremeIntervalWinnersCard";
import MovieWinnersByYearCard from "./Cards/MovieWinnersByYearCard";

import {
  getMaxMinInterval,
  findMovieWinnersByYear,
  getMultipleWinners,
  getStudiosWithWinCount,
} from "../../services/Dashboard.service";

/** CSS imports */
import "./Dashboard.css";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [multipleWinners, setMultipleWinners] = useState<MultipleWinners>();
  const [maxMinIntervalWinners, setMaxMinIntervalWinners] = useState<LongestShortestIntervalWinners>();
  const [top3studiosWithWinCount, setTop3studiosWithWinCount] = useState<StudiosWithWinCount>();
  const [movieWinnersByYear, setMovieWinnersByYear] = useState<MovieWinnerByYear[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    Promise.all([getMultipleWinners(), getMaxMinInterval(), getStudiosWithWinCount()])
      .then(([multipleWinnersData, maxMinIntervalData, studiosWithWinCountData]) => {
        setMultipleWinners(multipleWinnersData);
        setMaxMinIntervalWinners(maxMinIntervalData);

        if (studiosWithWinCountData) {
          const top3 = studiosWithWinCountData.studios
            .sort((studioA, studioB) => studioB.winCount - studioA.winCount)
            .slice(0, 3);
          setTop3studiosWithWinCount({
            ...studiosWithWinCountData,
            studios: top3,
          });
        }
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
  };

  const onSearchWinnersByYear = (event: any, year: number) => {
    event.preventDefault();

    if (year) {
      findMovieWinnersByYear(year).then((data) => setMovieWinnersByYear(data));
    }
  };

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="item">
      <YearsWithMultipleWinnersCard multipleWinners={multipleWinners} />
      <TopThreeStudiosCard studiosWithWinCount={top3studiosWithWinCount} />
      <ExtremeIntervalWinnersCard winners={maxMinIntervalWinners} />
      <MovieWinnersByYearCard movieWinners={movieWinnersByYear} onSearchWinnersByYear={onSearchWinnersByYear} />
    </div>
  );
};

export default Dashboard;
