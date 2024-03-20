import { act, render, screen, waitFor } from "@testing-library/react";
import Dashboard from "./Dashboard";

jest.mock("../../services/Dashboard.service", () => ({
  getMultipleWinners: jest.fn().mockResolvedValue({ years: [{ year: 2022, winnerCount: 2 }] }),
  getMaxMinInterval: jest.fn().mockResolvedValue({
    max: [
      {
        producer: "Producer1",
        interval: 10,
        previousWin: 2020,
        followingWin: 2030,
      },
    ],
    min: [
      {
        producer: "Producer2",
        interval: 5,
        previousWin: 2010,
        followingWin: 2015,
      },
    ],
  }),
  getStudiosWithWinCount: jest.fn().mockResolvedValue({
    studios: [
      { name: "Studio1", winCount: 5 },
      { name: "Studio2", winCount: 3 },
      { name: "Studio3", winCount: 10 },
    ],
  }),
  findMovieWinnersByYear: jest.fn().mockResolvedValue([
    { id: 1, year: 2021, title: "Movie1" },
    { id: 2, year: 2021, title: "Movie2" },
  ]),
}));

/** Tests the Dashboard Component */
describe("Dashboard Component", () => {
  /**
   * When the component is rendered, it should render successfuly'
   */
  it("renders without crashing", async () => {
    await act(async () => render(<Dashboard />));
  });

  /**
   * When the component is rendered, it should render the Cards correctly'
   */
  it("displays cards correctly", async () => {
    await act(async () => render(<Dashboard />));

    await waitFor(() => {
      expect(screen.getByText("List years with multiple winners")).toBeInTheDocument();
      expect(screen.getByText("Top 3 studios with winners")).toBeInTheDocument();
      expect(screen.getByText("Producers with longest and shortest interval between wins")).toBeInTheDocument();
      expect(screen.getByText("List movie winners by year")).toBeInTheDocument();
    });
  });
});
