<script lang="ts">
  import { fade } from "svelte/transition";
    import filterIcon from "../assets/filter.png";
    const { header } = $props();

    let showFilterPopover = $state(false);
</script>

<th scope="col" class="px-6 py-3">
    <div class="flex justify-between">
        { header.name }
        {#if header.columnFilter}
            <div class="flex flex-col items-center">
                <button class="p-1 -mt-1 -mr-5 cursor-pointer rounded-sm hover:bg-gray-200" popovertarget={`filter-popover-${header.name}`} popovertargetaction="toggle" onclick={() => showFilterPopover = !showFilterPopover}>
                    <img src={filterIcon} aria-label="filter-icon" height={15} width={15} alt="filter-icon"/>
                </button>
                {#if showFilterPopover}
                    <div popover id={`filter-popover-${header.name}`} class="absolute bg-red-100 p-3 rounded-sm overflow-x-auto filter-popover" transition:fade={{ duration: 200 }}>
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