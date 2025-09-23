import type { SvelteComponent } from "svelte";

export interface Column {
  accessor: string;
  filter?: Function;
  render?: Function;
}
