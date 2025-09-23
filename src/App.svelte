<script lang="ts">
  import { companies } from "./data/Companies";
  import DataTable from "./lib/DataTable.svelte";
  import Filter from "./lib/Filter.svelte";

  const columnsConfig = [
        {
            accessor: 'name',
            filter: Filter,
        },
        {
          accessor: 'streetAddress',
          render: ({ streetAddress, city }: {streetAddress: string, city: string}):string => `${streetAddress}, ${city}`
        },
        {
          accessor: 'state',
        },
        {
          accessor: 'missionStatement'
        }
      ]
</script>

<main>
    <div class="p-5">
      <DataTable companies={companies} columns={columnsConfig} />
    </div>
</main>