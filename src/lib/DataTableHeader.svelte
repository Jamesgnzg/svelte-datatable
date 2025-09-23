<script lang="ts">
    import filterIcon from "../assets/filter.png";
    const { header } = $props();

    let filterOpen = $state(false);
    
    const toggleFilter = () => {
        filterOpen = !filterOpen;
    }
</script>

<th scope="col" class="px-6 py-3">
    <div class="flex justify-between">
        { header.name }
        {#if header.columnFilter}
            <div class="flex flex-col items-center">
                <button class="p-1 -mt-1 -mr-5 cursor-pointer rounded-sm hover:bg-gray-200" onclick={toggleFilter}>
                    <img src={filterIcon} aria-label="filter-icon" height={15} width={15} alt="filter-icon"/>
                </button>
                {#if filterOpen}
                    <div class="absolute mt-5 bg-red-100 p-3 rounded-sm">
                        {@render header.columnFilter()}
                    </div>
                {/if}
            </div>
        {/if}
    </div>
</th>