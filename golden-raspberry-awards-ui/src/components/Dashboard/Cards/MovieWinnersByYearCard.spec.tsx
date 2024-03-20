import { render } from "@testing-library/react";

import MovieWinnersByYearCard from "./MovieWinnersByYearCard";
import { MovieWinnerByYear } from "../../../model/MovieWinnersByYear";

const mockData: MovieWinnerByYear[] = [
  { id: 1, year: 2000, title: "Movie 1", winner: true },
  { id: 2, year: 2010, title: "Movie 2", winner: false },
  { id: 3, year: 2020, title: "Movie 3", winner: true },
];

/** Tests the MovieWinnersByYearCard Component */
describe("MovieWinnersByYearCard", () => {
  /**
   * When the component is rendered, it should render with the correct title 'List movie winners by year'
   */
  it("should render correct title", () => {
    const { getByText } = render(<MovieWinnersByYearCard />);
    expect(getByText("List movie winners by year")).toBeInTheDocument();
  });

  /**
   * When the component is rendered without any data, it should be rendered without any errors
   */
  it("should render without data", () => {
    render(<MovieWinnersByYearCard />);
  });

  /**
   * When the component is rendered without any data, it should be rendered without the table
   */
  it("should not render the table without data", () => {
    const { queryByText } = render(<MovieWinnersByYearCard />);

    expect(queryByText("Id")).not.toBeInTheDocument();
    expect(queryByText("Year")).not.toBeInTheDocument();
    expect(queryByText("Title")).not.toBeInTheDocument();
  });

  /**
   * When the component is rendered passing data, it should be rendered successfully
   */
  it("should render with data", () => {
    render(<MovieWinnersByYearCard movieWinners={mockData} />);
  });

  /**
   * When the component is rendered passing data, it should be rendered successfully and with correct data
   */
  it("should render correct data", () => {
    const { queryByText, getByText } = render(<MovieWinnersByYearCard movieWinners={mockData} />);

    expect(getByText("Movie 1")).toBeInTheDocument();
    expect(getByText("Movie 2")).toBeInTheDocument();
    expect(getByText("Movie 3")).toBeInTheDocument();

    expect(queryByText("Movie 99")).not.toBeInTheDocument();
  });
});
