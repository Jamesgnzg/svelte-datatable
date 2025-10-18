<script lang="ts">
    import DataTableRows from "./DataTableRows.svelte";

    const { tableData, colspan, columnKeys, rowExpansion, striped} = $props();
</script>

<tbody>
    {#each tableData as data, index}
       <DataTableRows striped={striped} columnKeys={columnKeys} data={data} index={index} colspan={colspan} rowExpansion={rowExpansion} />
    {/each}
</tbody>