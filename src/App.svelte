<script lang="ts">
  import { companies } from "./data/Companies";
  import type { company } from "./interface/companies";
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
    const initialRecords:company[] = companies;
</script>

<main>
    <div class="p-5">
      <DataTable companies={[]} columns={columnsConfig} noRecordsMessage={"No records to show"}/>
    </div>
</main>