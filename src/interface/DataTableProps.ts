import type { company } from "./companies";
import type { Column } from "./column";

export interface DataTableProps {
  companies: company[];
  columns: Column[];
  noRecordsMessage?: string;
  stickyHeader?: boolean;
  striped?: boolean;
  fetching?: boolean;
  totalRecords?: number;
  page?: number;
  onPageChange?: Function;
  selectedRecordsPerPage?: number;
  recordsPerPageSelection?: number[];
  updateRecordsPerPage?: (newPageSize: number) => void;
  paginationActiveBackgroundColor?: string;
  rowExpansion?: Function;
}
