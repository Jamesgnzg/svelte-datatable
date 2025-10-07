export interface Column {
  accessor: string;
  filter?: Function;
  render?: Function;
  filtering?: Boolean;
}
