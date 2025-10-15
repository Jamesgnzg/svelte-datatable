export interface ColumnHeader {
  index: number;
  name: string;
  columnFilter?: Function;
  isFiltered: Boolean;
}
