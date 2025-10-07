<script lang="ts">
    import searchIcon from "../assets/search-icon.png";
    import closeIcon from "../assets/cross.png";

    let { query = $bindable('') } = $props();
</script>

<div class="normal-case">
    <label for="name" class="text-base rtl:text-right font-bold block text-gray-700 dark:text-gray-200 space-y-2 mb-1">
        Company
    </label>
    <p class="mb-2 font-light">
        Show companies whose names include the specified text
    </p>
    <div class="flex w-full gap-1 border border-gray-300 px-2 py-2 focus-within:border-orange-500 rounded-lg">
        <img src={searchIcon} class="bg-transparent" aria-label="search-icon" height={5} width={20} alt="search-icon"/>
        <input name="name" class="text-sm text-gray-500 font-normal w-full focus:outline-none" placeholder="Search company..." bind:value={query}/>
        <button class="ring-0 cursor-pointer hover:bg-gray-100 rounded p-1" onclick={() => query = ''}>
            <img src={closeIcon} class="bg-transparent" aria-label="close-icon" height={5} width={20} alt="close-icon" title="Clear Filter" />
        </button>
    </div>
</div>