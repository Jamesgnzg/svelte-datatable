<script lang="ts">
    import { slide } from "svelte/transition";
    import filterIcon from "../assets/filter.png";
    import filterIconActive from "../assets/filter-active.png";
    import type { ColumnHeader } from "../interface/columnHeader";

    const { header = $bindable() }: { header: ColumnHeader} = $props();

    let showFilterPopover = $state(false);

    const togglePopover = () => {
        if (showFilterPopover == true) {
            setTimeout(() => {
                showFilterPopover = false;
            }, 200)
        } else {
            showFilterPopover = true;
        }
    }
</script>

<th scope="col" class="px-6 py-3">
    <div class="flex justify-between">
        { header.name }
        {#if header.columnFilter}
            <div class="flex flex-col items-center">
                <button class="p-1 -mt-1 -mr-5 cursor-pointer rounded-sm hover:bg-gray-200" id={`filter-popover-toggle-${header.name}`} popovertarget={`filter-popover-${header.name}`} popovertargetaction="show" onclick={() => togglePopover() } >
                    {#if header.isFiltered}
                        <img src={filterIconActive} aria-label="filter-icon" height={15} width={15} alt="filter-icon"/>
                    {:else}
                        <img src={filterIcon} aria-label="filter-icon" height={15} width={15} alt="filter-icon"/>
                    {/if}
                </button>
                {#if showFilterPopover}
                    <div popover="manual" id={`filter-popover-${header.name}`} class="absolute shadow-md mt-2 p-3 rounded-sm overflow-x-auto filter-popover min-h-10" in:slide={{ duration: 330, delay: 200 }} out:slide >
                        {@render header.columnFilter()}
                    </div>
                {/if}
            </div>
        {/if}
    </div>
</th>

<style>
    .filter-popover {
        margin: 0;
        inset: auto;
        position-area: bottom;
        justify-self: anchor-center;
    }
</style>