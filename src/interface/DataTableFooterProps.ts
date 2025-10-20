import type { DataTableProps } from "./DataTableProps";

type TableProps = Pick<
  DataTableProps,
  | "selectedRecordsPerPage"
  | "totalRecords"
  | "recordsPerPageSelection"
  | "updateRecordsPerPage"
  | "paginationActiveBackgroundColor"
  | "page"
  | "onPageChange"
>;

interface FooterProps {
  colspan: number;
  displayedRecords?: boolean;
}

export type DataTableFooterProps = TableProps & FooterProps;
