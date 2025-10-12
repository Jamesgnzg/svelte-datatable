import type { company } from "./companies";
import type { Column } from "./column";

export interface DataTableProps {
  companies: company[];
  columns: Column[];
  noRecordsMessage?: string;
  stickyHeader?: boolean;
  fetching?: boolean;
  totalRecords?: number;
  page?: number;
  onPageChange?: Function;
  recordsPerPage?: number;
  recordsPerPageSelection?: number[];
}
