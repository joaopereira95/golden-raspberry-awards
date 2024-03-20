import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";

import { MultipleWinners } from "../../../model/MultipleWinners";

interface Props {
  multipleWinners?: MultipleWinners;
}

/**
 * Card component with the list of years with multiple winners
 * @param multipleWinners
 * @returns YearsWithMultipleWinnersCard component
 */
const YearsWithMultipleWinnersCard = ({ multipleWinners }: Props) => {
  return (
    <Card title="List years with multiple winners" className="card">
      {multipleWinners && multipleWinners.years && (
        <DataTable value={multipleWinners.years} showGridlines stripedRows size="small" id="yearsWithMultipleWinners">
          <Column field="year" header="Year" style={{ width: "50%" }}></Column>
          <Column field="winnerCount" header="Win Count" style={{ width: "50%" }}></Column>
        </DataTable>
      )}
    </Card>
  );
};

export default YearsWithMultipleWinnersCard;
