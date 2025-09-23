<script lang="ts">
  import type { Column } from "../interface/column";
  import type { ColumnDataMapping } from "../interface/columnMapping";
  import type { company } from "../interface/companies";
  import DataTableHeader from "./DataTableHeader.svelte";

    const { companies, columns }: {companies: company[], columns:Column[]} = $props();
    const columnDataMapping:ColumnDataMapping<Column> = {};
    let columnHeaders: any[] = [];
    let tableData: any[] = [];
    let dataKeys:  any[] = $derived(Object.keys(columnDataMapping));

    const separateWordsByCase = (str: string): string => {
        return str.replace(/([a-z])([A-Z])/g, '$1 $2');
    }

    const createColumnHeaders = () => {
        columns.forEach((column) => {
            columnHeaders.push({
                name: separateWordsByCase(column.accessor),
                columnFilter: column?.filter
            })
        })
    }

    const createColumnDataMapping = () => {
        columns.forEach((column) => {
            columnDataMapping[column.accessor] = {
                accessor: column.accessor,
                filter: column?.filter,
                render: column?.render
            } 
        })
    }

    const mapKeysToData = () => {
        companies.forEach((company: { [x: string]: any; }) => {
            let formattedData: any = {};
            dataKeys.forEach((key) =>{
                if(columnDataMapping[key].render) {
                    formattedData[key] = columnDataMapping[key].render.apply(company, [company]);
                } else {
                    formattedData[key] = company[key];
                }
            })

            tableData.push(formattedData);
        })
    }

    $effect.pre(() => {
        createColumnHeaders();
        createColumnDataMapping();
        mapKeysToData();
    })
</script>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {#each columnHeaders as header}
                    <DataTableHeader header={header} />
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each tableData as data}
                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                    {#each dataKeys as key}
                        <td class="px-6 py-4">
                            { data[key] }
                        </td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
</div>