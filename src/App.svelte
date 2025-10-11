<script lang="ts">
  import { companies } from "./data/Companies";
  import type { company } from "./interface/companies";
  import DataTable from "./lib/DataTable.svelte";
  import Filter from "./lib/Filter.svelte";
  import searchIcon from "../src/assets/search-icon.png";
  import closeIcon from "../src/assets/cross.png";

  const initialRecords:company[] = companies;
  const PAGE_SIZE = [10, 15, 20];
  let nameQuery = $state.raw('');
  let records:company[] | [] = $derived.by(() => {
    return initialRecords.filter(({name}) => {
      if (!name.toLowerCase().includes(nameQuery.trim().toLowerCase()) && nameQuery !== '') {
        return false;
      }
      return true;
    })
  })

</script>

<main>
  {#snippet nameFilterSnippet()}
    <div class="normal-case">
      <label for="name" class="text-base rtl:text-right font-bold block text-gray-700 dark:text-gray-200 space-y-2 mb-1">
          Company
      </label>
      <p class="mb-2 font-light">
          Show companies whose names include the specified text
      </p>
      <div class="flex w-full gap-1 border border-gray-300 px-2 py-2 focus-within:border-orange-500 rounded-lg">
          <img src={searchIcon} class="bg-transparent" aria-label="search-icon" height={5} width={20} alt="search-icon"/>
          <input name="name" class="text-sm text-gray-500 font-normal w-full focus:outline-none" placeholder="Search company..." bind:value={nameQuery} />
          <button class="ring-0 cursor-pointer hover:bg-gray-100 rounded p-1" onclick={() => nameQuery = ''}>
              <img src={closeIcon} class="bg-transparent" aria-label="close-icon" height={5} width={20} alt="close-icon" title="Clear Filter" />
          </button>
      </div>
    </div>
  {/snippet}

  <div class="p-5">
    <DataTable 
      bind:companies={records}
      columns={[
        {
          accessor: 'name',
          filter: nameFilterSnippet,
          filtering:  nameQuery !== ''
        },
        {
          accessor: 'streetAddress',
          render: ({ streetAddress, city }: {streetAddress: string, city: string}):string => `${streetAddress}, ${city}`
        },
        {
          accessor: 'state',
          filter: Filter,
        },
        {
          accessor: 'missionStatement',
          filter: Filter,
        }
      ]}
      stickyHeader = {true}
    />
  </div>
</main>