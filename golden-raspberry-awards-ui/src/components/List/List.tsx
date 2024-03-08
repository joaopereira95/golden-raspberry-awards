/** React imports */
import { useEffect, useState } from 'react';

/** Primereact imports */
import { DataTable, DataTableFilterEvent, DataTableFilterMeta, DataTablePageEvent } from 'primereact/datatable';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { InputNumber, InputNumberChangeEvent } from 'primereact/inputnumber';
import { FilterMatchMode } from 'primereact/api';

/** Custom imports */
import { MoviesWithPagination } from '../../model/MoviesWithPagination';
import { MovieSearchFilters, findMoviesByFilters } from '../../services/Dashboard.service';

interface LazyTableState {
    first: number;
    rows: number;
    page: number;
    filters: DataTableFilterMeta;
}

const initialTableState = {
  first: 0,
    rows: 10,
    page: 0,
    filters: {
      year: { value: null, matchMode: FilterMatchMode.EQUALS },
      winner: { value: null, matchMode: FilterMatchMode.EQUALS } 
    }
};

const List = () => {
  const [movies, setMovies] = useState<MoviesWithPagination>();
  const [tableState, setTableState] = useState<LazyTableState>(initialTableState);
  
  useEffect(() => {
    searchMovies();
  }, []);

  const searchMovies = (filters?: MovieSearchFilters) => {
    findMoviesByFilters(filters).then(data => setMovies(data));
  }

  const configureFilters = (filter: any) => {
    const searchFilters : MovieSearchFilters = {
      page: tableState.page,
      rows: tableState.rows,
      winner: filter.winner.value !== null ? filter.winner.value : undefined,
      year: filter.year.value
    } 

    return searchFilters;
  }

  const onFilter = (event: DataTableFilterEvent) => {
    setTableState({...tableState, filters: event.filters, first: 0, page: 0});
    tableState.first = 0;
    tableState.page = 0;

    const filters = configureFilters(event.filters);

    if (!filters.year || (filters.year && filters.year.toString().length === 4)) {
      searchMovies(filters);
    }

  };

  const onPage = (event: DataTablePageEvent) => {
    tableState.page = event.page ? event.page : 0;
    tableState.first = event.first ? event.first : 0;
    
    setTableState({...tableState, 
      page: event.page ? event.page : 0,
      first: event.first ? event.first : 0
    });

    const filters = configureFilters(tableState.filters);

    searchMovies(filters);
  };

  const winnerRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {

  return (
      <Dropdown value={options.value} options={[true, false]} onChange={(event: DropdownChangeEvent) => { options.filterApplyCallback(event.value) }} 
        itemTemplate={winnerItemTemplate} valueTemplate={winnerItemTemplate} placeholder="Yes/No" className="p-column-filter" showClear style={{ minWidth: '12rem' }} />
  );
  
};

const yearRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {

  return (
      <InputNumber value={options.value} placeholder='Filter by year' mode="decimal" useGrouping={false} 
        maxLength={4} onChange={(event: InputNumberChangeEvent) => { options.filterApplyCallback(event.value) }}/>
  );
};

const winnerItemTemplate = (option: boolean) => {
  return <span>{option === null ? 'Yes/No' : option === true ? 'Yes' : 'No'}</span>;
}

const winnerTemplate = (rowData: any) => {
  return winnerItemTemplate(rowData.winner);
};

  return (
    <div>
      <h3 className="m-0">List movies</h3>  
        { movies && 
          <DataTable value={movies.content} lazy dataKey="id" paginator 
          rows={tableState.rows} first={tableState.first} totalRecords={movies.totalElements} filters={tableState.filters}
          onFilter={onFilter} onPage={onPage}
          showGridlines stripedRows filterDisplay="row" size='small'>

              <Column field="id" header="Id" style={{ width: '15%' }}></Column>
              <Column field="year" header="Year" filter showFilterMenu={false} filterElement={yearRowFilterTemplate} style={{ width: '41%' }}></Column>
              <Column field="title" header="Title" style={{ width: '40%' }}></Column>
              <Column field="winner" header="Winner?" dataType="boolean" body={winnerTemplate} filter filterElement={winnerRowFilterTemplate} style={{ width: '4%' }}></Column>
          </DataTable>
        } 
    </div>
  );
}

export default List;
