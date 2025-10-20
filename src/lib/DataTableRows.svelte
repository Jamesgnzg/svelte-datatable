<script lang="ts">
    import type { DataTableRowsProps } from "../interface/DataTableRowsProps";
    import { slide } from "svelte/transition";

    const { striped, columnKeys, index, data, colSpan, rowExpansion }: DataTableRowsProps = $props();
    const displayCursor = rowExpansion ? 'cursor-pointer' : '';
    const stripedBackground = striped && index % 2 !== 0 ? 'bg-gray-50': '';
    let showExpandedRow = $state(false);

    const toggleExpandedRow = () => showExpandedRow = !showExpandedRow
</script>

<tr class="border-b dark:border-gray-700 border-gray-200 {displayCursor} {stripedBackground}" onclick={toggleExpandedRow}>
    {#each columnKeys as key}
        <td class="px-6 py-4">
            { data[key] }
        </td>
    {/each}
</tr>

{#if rowExpansion && showExpandedRow}
    <tr class="border-b dark:border-gray-700 border-gray-200 {stripedBackground}" >
        <td colspan={colSpan}>
            <div class="p-5" in:slide={{ duration: 330 }} out:slide>
                {@render rowExpansion(data)}
            </div>
        </td>
    </tr>
{/if}