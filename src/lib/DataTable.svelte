<script lang="ts">
    import type { Column } from "../interface/column";
    import type { ColumnDataMapping } from "../interface/columnMapping";
    import type { DataTableProps } from "../interface/DataTableProps";
    import type { ColumnHeader } from "../interface/columnHeader";
    import DataTableHeader from "./DataTableHeader.svelte";
    import NoDataIcon from "../assets/no-data.png";
    import Spinner from "../assets/loading.png";

    const { companies = $bindable([]), columns, noRecordsMessage = "No records", 
            stickyHeader = false, fetching = $bindable(false), totalRecords = 0, page = $bindable(0),  onPageChange, 
            displayedRecordsPerPage = $bindable(0), recordsPerPageSelection = $bindable([]), updateRecordsPerPage, paginationActiveBackgroundColor="bg-orange-200"}: DataTableProps = $props();
    const stickyHeaderClass: string = stickyHeader ? 'sticky top-0' : '';
    const totalPages = $derived(Math.ceil(totalRecords / displayedRecordsPerPage));
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
        columns.forEach((column) => {
            col.push({
                name: separateWordsByCase(column.accessor),
                columnFilter: column?.filter,
                isFiltered: column.filtering || false
            })
        })

        return col;
    });
    let dataKeys:  string[] = $derived(Object.keys(columnDataMapping));
    let tableData: any[] = $derived.by(() => {
        const data: any[] = []; 
        companies.forEach((company: { [x: string]: any; }) => {
            let formattedData: any = {};
            dataKeys.forEach((key) =>{
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
    let shownRecordsPerPage = $state(displayedRecordsPerPage);

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
        {#if displayedRecordsPerPage > 0 && onPageChange && updateRecordsPerPage}
            <tfoot>
                <tr>
                    <td colspan={columns.length}>
                        <div class="flex p-4 font-bold w-full md:justify-between md:flex-row flex-col items-center">
                            <span class="pt-3">{shownRecordsPerPage} / {totalRecords}</span>
                            <div class="flex gap-10 flex-col justify-center items-center md:justify-between md:min-w-sm md:flex-row">
                                <label for="numberOfRecs" class="text-sm font-medium text-gray-900 dark:text-white w-full">Records per page</label>
                                <select id="numberOfRecs" class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-blue-500 w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" bind:value={shownRecordsPerPage} onchange={() => updateRecordsPerPage(shownRecordsPerPage)}>
                                    {#each recordsPerPageSelection as numberOfRecords}
                                        <option value={numberOfRecords}>{numberOfRecords}</option>
                                    {/each}
                                </select>
                                <nav class="flex items-center -space-x-px" aria-label="Pagination">
                                    <button type="button" class="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-lg last:rounded-e-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10" aria-label="Previous"
                                        onclick={() => { if( page > 1 ) onPageChange(page - 1)} } disabled={ page <= 1 }>
                                        <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="m15 18-6-6 6-6"></path>
                                        </svg>
                                        <span class="hidden sm:block">Previous</span>
                                    </button>
                                    {#each { length:totalPages } , index }
                                        <button type="button" class="min-h-9.5 min-w-9.5 flex justify-center items-center text-gray-800 border border-gray-200 py-2 px-3 text-sm first:rounded-s-lg last:rounded-e-lg focus:outline-hidden focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-600 dark:border-neutral-700 dark:text-white dark:focus:bg-neutral-500 { page == index + 1 ? paginationActiveBackgroundColor : '' }" aria-current="page" onclick={() => onPageChange(index + 1)}>{index + 1}</button>
                                    {/each}
                                    <button type="button" class="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-lg last:rounded-e-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10" aria-label="Next"
                                        onclick={() => { if( page < totalPages ) onPageChange(page + 1)} } disabled={ page == totalPages }>
                                        <span class="hidden sm:block">Next</span>
                                        <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="m9 18 6-6-6-6"></path>
                                        </svg>
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </td>
                </tr>
            </tfoot>
        {/if}
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