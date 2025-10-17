<script lang="ts">
    import { slide } from "svelte/transition";
    
    const {columnKeys, data, colspan, rowExpansion} = $props();
    let showExpandedRow = $state(false);
    const handleClick = () => showExpandedRow = !showExpandedRow
</script>

<tr class=" border-b dark:border-gray-700 border-gray-200" onclick={handleClick}>
    {#each columnKeys as key}
        <td class="px-6 py-4">
            { data[key] }
        </td>
    {/each}
</tr>

{#if showExpandedRow}
    <tr class="bg-gray-100 border-b dark:border-gray-700 border-gray-200" >
        <td colspan={colspan}>
            <div class="p-5" in:slide={{ duration: 330 }} out:slide>
                {@render rowExpansion(data)}
            </div>
        </td>
    </tr>
{/if}