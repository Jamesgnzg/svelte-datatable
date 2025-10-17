<script lang="ts">
    import DataTableRows from "./DataTableRows.svelte";

    const { tableData, colspan, columnKeys, rowExpansion } = $props();
</script>

<tbody>
    {#each tableData as data}
       <DataTableRows columnKeys={columnKeys} data={data} colspan={colspan} rowExpansion={rowExpansion} />
    {/each}
</tbody>