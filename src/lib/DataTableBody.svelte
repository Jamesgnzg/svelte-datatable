<script lang="ts">
    import type { DataTableBodyProps } from "../interface/DataTableBodyProps";
    import DataTableRows from "./DataTableRows.svelte";

    const { tableData, colSpan, columnKeys, rowExpansion, striped = false }: DataTableBodyProps = $props();
</script>

<tbody>
    {#each tableData as data, index}
       <DataTableRows striped={striped} columnKeys={columnKeys} data={data} index={index} colSpan={colSpan} rowExpansion={rowExpansion} />
    {/each}
</tbody>