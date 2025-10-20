import type { DataTableProps } from "./DataTableProps";
import type { TableData } from "./tableData";

type BodyInherited = Pick<DataTableProps, "rowExpansion" | "striped">;

interface BodyProps {
  tableData: TableData[];
  colSpan: number;
  columnKeys: string[];
}

export type DataTableBodyProps = BodyInherited & BodyProps;
