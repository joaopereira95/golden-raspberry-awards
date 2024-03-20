import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";

import { InputNumber } from "primereact/inputnumber";
import { MovieWinnerByYear } from "../../../model/MovieWinnersByYear";
import { Button } from "primereact/button";
import { useState } from "react";

interface Props {
  movieWinners?: MovieWinnerByYear[];
  onSearchWinnersByYear?: (event: any, year: number) => void;
}

/**
 * Card component with the List of movie winners filtered by year
 * @param movieWinners
 * @param onSearchWinnersByYear - callback function to search by year
 * @returns MovieWinnersByYearCard component
 */
const MovieWinnersByYearCard = ({ movieWinners, onSearchWinnersByYear }: Props) => {
  const currentYear = new Date().getFullYear();
  const [searchYear, setSearchYear] = useState<number>(currentYear);

  return (
    <Card title="List movie winners by year" className="card">
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <span className="p-float-label" style={{ marginRight: "3px", display: "inline", width: "100%" }}>
          <InputNumber
            inputId="minmax-buttons"
            useGrouping={false}
            value={searchYear}
            onValueChange={(e: any) => setSearchYear(e.value)}
            showButtons
            min={1800}
            max={currentYear}
            style={{ width: "100%" }}
          />
          <label htmlFor="number-input">Search by year</label>
        </span>

        <Button
          label=""
          type="submit"
          icon="pi pi-search"
          onClick={(event: any) => {
            if (onSearchWinnersByYear) onSearchWinnersByYear(event, searchYear);
          }}
        />
      </div>

      {movieWinners && (
        <DataTable value={movieWinners} showGridlines stripedRows size="small">
          <Column field="id" header="Id" style={{ width: "33%" }}></Column>
          <Column field="year" header="Year" style={{ width: "33%" }}></Column>
          <Column field="title" header="Title" style={{ width: "33%" }}></Column>
        </DataTable>
      )}
    </Card>
  );
};

export default MovieWinnersByYearCard;
