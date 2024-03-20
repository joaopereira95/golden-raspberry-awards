import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";

import { StudiosWithWinCount } from "../../../model/StudiosWithWinCount";

interface Props {
  studiosWithWinCount?: StudiosWithWinCount;
}

/**
 * Card component with the top 3 studios with win count
 * @param studiosWithWinCount
 * @returns TopThreeStudiosCard component
 */
const TopThreeStudiosCard = ({ studiosWithWinCount }: Props) => {
  if (studiosWithWinCount) {
    studiosWithWinCount.studios = studiosWithWinCount.studios
      .sort((studioA, studioB) => studioB.winCount - studioA.winCount)
      .slice(0, 3);
  }

  return (
    <Card title="Top 3 studios with winners" className="card">
      {studiosWithWinCount && studiosWithWinCount.studios && (
        <DataTable value={studiosWithWinCount.studios} showGridlines stripedRows size="small">
          <Column field="name" header="Name" style={{ width: "50%" }}></Column>
          <Column field="winCount" header="Win Count" style={{ width: "50%" }}></Column>
        </DataTable>
      )}
    </Card>
  );
};

export default TopThreeStudiosCard;
