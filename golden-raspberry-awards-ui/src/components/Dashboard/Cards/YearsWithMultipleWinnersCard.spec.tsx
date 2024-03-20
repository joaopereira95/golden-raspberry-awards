import { render } from "@testing-library/react";
import YearsWithMultipleWinnersCard from "./YearsWithMultipleWinnersCard";
import { MultipleWinners } from "../../../model/MultipleWinners";

const mockData: MultipleWinners = {
  years: [
    { year: 2021, winCount: 2 },
    { year: 2022, winCount: 5 },
  ],
};

/** Tests the MovieWinnersByYearCard Component */
describe("YearsWithMultipleWinnersCard", () => {
  /**
   * When the component is rendered, it should render with the correct title 'List years with multiple winners'
   */
  it("should render correct title", () => {
    const { getByText } = render(<YearsWithMultipleWinnersCard />);
    expect(getByText("List years with multiple winners")).toBeInTheDocument();
  });

  /**
   * When the component is rendered without any data, it should be rendered without any errors
   */
  it("should render without data", () => {
    render(<YearsWithMultipleWinnersCard />);
  });

  /**
   * When the component is rendered without any data, it should be rendered without the table
   */
  it("should not render the table without data", () => {
    const { queryByText } = render(<YearsWithMultipleWinnersCard />);

    expect(queryByText("Year")).not.toBeInTheDocument();
    expect(queryByText("Win Count")).not.toBeInTheDocument();
  });

  /**
   * When the component is rendered passing data, it should be rendered successfully
   */
  it("should render with data", () => {
    render(<YearsWithMultipleWinnersCard multipleWinners={mockData} />);
  });

  /**
   * When the component is rendered passing data, it should be rendered successfully and with correct data
   */
  it("should render correct data", () => {
    const { queryByText, getByText } = render(<YearsWithMultipleWinnersCard multipleWinners={mockData} />);

    expect(getByText("2021")).toBeInTheDocument();
    expect(getByText("2022")).toBeInTheDocument();
    expect(queryByText("2024")).not.toBeInTheDocument();
    expect(queryByText("2025")).not.toBeInTheDocument();
  });
});
