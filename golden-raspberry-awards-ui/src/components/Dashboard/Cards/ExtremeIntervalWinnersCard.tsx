import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";

import { LongestShortestIntervalWinners } from "../../../model/LongestShortestIntervalWinners";

interface Props {
  winners?: LongestShortestIntervalWinners;
}

/**
 * Card component with the longest and shortest interval between wins
 * @param props
 * @returns ExtremeIntervalWinnersCard component
 */
const ExtremeIntervalWinnersCard = ({ winners }: Props) => {
  return (
    <Card title="Producers with longest and shortest interval between wins" className="card">
      <h3 className="m-0">Maximum</h3>
      {winners && winners.max && (
        <DataTable value={winners.max} showGridlines stripedRows size="small">
          <Column field="producer" header="Producer" style={{ width: "25%" }}></Column>
          <Column field="interval" header="Interval" style={{ width: "25%" }}></Column>
          <Column field="previousWin" header="Previous Year" style={{ width: "25%" }}></Column>
          <Column field="followingWin" header="Following Year" style={{ width: "25%" }}></Column>
        </DataTable>
      )}

      <h3 className="m-0">Minimum</h3>
      {winners && winners.min && (
        <DataTable value={winners.min} showGridlines stripedRows size="small">
          <Column field="producer" header="Producer" style={{ width: "25%" }}></Column>
          <Column field="interval" header="Interval" style={{ width: "25%" }}></Column>
          <Column field="previousWin" header="Previous Year" style={{ width: "25%" }}></Column>
          <Column field="followingWin" header="Following Year" style={{ width: "25%" }}></Column>
        </DataTable>
      )}
    </Card>
  );
};

export default ExtremeIntervalWinnersCard;
