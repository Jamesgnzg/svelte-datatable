import type { DataTableProps } from "./DataTableProps";

type FooterInherited = Pick<
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

export type DataTableFooterProps = FooterInherited & FooterProps;
