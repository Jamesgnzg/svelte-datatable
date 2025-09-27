<script lang="ts">
  import { companies } from "./data/Companies";
  import DataTable from "./lib/DataTable.svelte";
  import Filter from "./lib/Filter.svelte";
  import NameFilter from "./lib/NameFilter.svelte";

  const columnsConfig = [
        {
            accessor: 'name',
            filter: NameFilter,
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
      ]
</script>

<main>
    <div class="p-5">
      <DataTable companies={companies} columns={columnsConfig} />
    </div>
</main>