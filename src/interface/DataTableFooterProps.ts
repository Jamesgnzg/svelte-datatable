export interface DataTableFooterProps {
  colspan: number;
  selectedRecordsPerPage: number;
  totalRecords: number;
  recordsPerPageSelection: number[];
  updateRecordsPerPage?: (newPageSize: number) => void;
  paginationActiveBackgroundColor?: string;
  page?: number;
  onPageChange?: Function;
  displayedRecords?: boolean;
}
