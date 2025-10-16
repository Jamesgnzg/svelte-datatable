<script lang="ts">
    import type { Column } from "../interface/column";
    import type { ColumnDataMapping } from "../interface/columnMapping";
    import type { DataTableProps } from "../interface/DataTableProps";
    import type { ColumnHeader } from "../interface/columnHeader";
    import type { TableData } from "../interface/tableData";
    import DataTableHeader from "./DataTableHeader.svelte";
    import DataTableBody from "./DataTableBody.svelte";
    import DataTableFooter from "./DataTableFooter.svelte";
    import NoDataIcon from "../assets/no-data.png";
    import Spinner from "../assets/loading.png";

    const { companies = $bindable([]), columns, noRecordsMessage = "No records", 
            stickyHeader = false, fetching = $bindable(false), totalRecords = 0, page = $bindable(0),  onPageChange, 
            selectedRecordsPerPage = $bindable(0), recordsPerPageSelection = $bindable([]),
            updateRecordsPerPage, paginationActiveBackgroundColor}: DataTableProps = $props();
    const stickyHeaderClass: string = stickyHeader ? 'sticky top-0' : '';
    let columnDataMapping:ColumnDataMapping<Column> = $derived.by(() => {
        const dataMapping: ColumnDataMapping<Column> = {};
        columns.forEach((column) => {
            dataMapping[column.accessor] = {
                accessor: column.accessor,
                filter: column?.filter,
                render: column?.render
            } 
        })

        return dataMapping;
    });
    let columnHeaders: ColumnHeader[] = $derived.by(() => {
        const col: ColumnHeader[]  = [];
        columns.forEach((column, i) => {
            col.push({
                index: i,
                name: separateWordsByCase(column.accessor),
                columnFilter: column?.filter,
                isFiltered: column.filtering || false
            })
        })

        return col;
    });
    let columnKeys:  string[] = $derived(Object.keys(columnDataMapping));
    let tableData: TableData[] = $derived.by(() => {
        const data: TableData[] = []; 
        companies.forEach((company: { [x: string]: any; }) => {
            let formattedData: TableData = {};
            columnKeys.forEach((key) =>{
                if(columnDataMapping[key].render) {
                    formattedData[key] = columnDataMapping[key].render.apply(company, [company]);
                } else {
                    formattedData[key] = company[key];
                }
            })

            data.push(formattedData);
        })

        return data;
    });

    const separateWordsByCase = (str: string): string => {
        return str.replace(/([a-z])([A-Z])/g, '$1 $2');
    }
</script>

<div class="relative shadow-md sm:rounded-lg">
    {#if fetching}
        <div role="status" class="absolute flex h-full w-full items-center justify-center bg-white opacity-55 z-10">
            <img src={Spinner} class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600" alt="Loading.."  />
            <span class="sr-only">Loading...</span>
        </div>
    {/if}
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 {stickyHeaderClass} z-2">
            <tr>
                {#each columnHeaders as header}
                    <DataTableHeader header={header} />
                {/each}
            </tr>
        </thead>
        <DataTableBody tableData={tableData} columnKeys={columnKeys}/>
        <DataTableFooter colspan={columns.length} selectedRecordsPerPage={selectedRecordsPerPage} totalRecords={totalRecords} recordsPerPageSelection={recordsPerPageSelection}
            updateRecordsPerPage={updateRecordsPerPage} paginationActiveBackgroundColor={paginationActiveBackgroundColor}
            page={page} onPageChange={onPageChange} displayedRecords={ tableData.length > 0 } />
    </table>

    {#if tableData.length === 0}
        <div class="flex justify-center items-center">
            <div class="p-5">
                <img class="items-center m-auto" src={NoDataIcon} height={40} width={40} alt="No Data" />
                <p class="text-gray-400">{noRecordsMessage}</p>
            </div>
        </div>
    {/if}
</div>