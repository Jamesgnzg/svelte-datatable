<script lang="ts">
  import { companies } from "./data/Companies";
  import type { company } from "./interface/companies";
  import DataTable from "./lib/DataTable.svelte";
  import Filter from "./lib/Filter.svelte";
  import NameFilter from "./lib/NameFilter.svelte";
  
  let nameQuery = $state('');

  const initialRecords:company[] = companies;
  const records:company[] | [] = $derived.by(() => {
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
    <NameFilter bind:query={nameQuery} />
  {/snippet}
  
    <div class="p-5">
      <DataTable companies={records} columns={[
        {
            accessor: 'name',
            filter: nameFilterSnippet,
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
      ]} />
    </div>
</main>