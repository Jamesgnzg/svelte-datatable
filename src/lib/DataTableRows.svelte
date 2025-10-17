<script lang="ts">
    import type { DataTableRowsProps } from "../interface/DataTableRowsProps";
    import { slide } from "svelte/transition";

    const {columnKeys, data, colspan, rowExpansion}: DataTableRowsProps = $props();
    const displayCursor = rowExpansion ? 'cursor-pointer' : '';
    let showExpandedRow = $state(false);

    const toggleExpandedRow = () => showExpandedRow = !showExpandedRow
</script>

<tr class="border-b dark:border-gray-700 border-gray-200 {displayCursor}" onclick={toggleExpandedRow}>
    {#each columnKeys as key}
        <td class="px-6 py-4">
            { data[key] }
        </td>
    {/each}
</tr>

{#if rowExpansion && showExpandedRow}
    <tr class="bg-gray-100 border-b dark:border-gray-700 border-gray-200" >
        <td colspan={colspan}>
            <div class="p-5" in:slide={{ duration: 330 }} out:slide>
                {@render rowExpansion(data)}
            </div>
        </td>
    </tr>
{/if}