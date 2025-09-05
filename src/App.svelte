<script lang="ts">
  import { companies } from "./data/Companies";
  import DataTable from "./lib/DataTable.svelte";
</script>

<main>
    <div class="p-5">
      <DataTable companies={companies} columns={[
        {
            access: 'name',
            filter: (name:string) => name !== null,
        },
        {
          access: 'streetAddress',
          render: ({ streetAddress, city }: {streetAddress: string, city: string}):string => `${streetAddress}, ${city}`
        },
        {
          access: 'state',
        },
        {
          access: 'missionStatement'
        }
      ]} />
    </div>
</main>