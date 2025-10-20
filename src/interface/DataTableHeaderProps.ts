import type { DataTableProps } from "./DataTableProps";
import type { ColumnHeader } from "./columnHeader";

type TableProps = Pick<DataTableProps, "stickyHeader">;

interface HeaderProps {
  columnHeaders: ColumnHeader[];
}

export type DataTableHeaderProps = TableProps & HeaderProps;
