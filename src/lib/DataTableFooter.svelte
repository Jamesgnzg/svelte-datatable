<script lang="ts">
  import type { DataTableFooterProps } from "../interface/DataTableFooterProps";

    const { colspan, selectedRecordsPerPage = 0, totalRecords = 0, recordsPerPageSelection,
    updateRecordsPerPage, paginationActiveBackgroundColor = "bg-orange-200",
    page = 0, onPageChange, displayedRecords }: DataTableFooterProps  = $props();
    const totalPages = $derived(Math.ceil(totalRecords / selectedRecordsPerPage));

    let shownRecordsPerPage = $state(selectedRecordsPerPage);
</script>

<tfoot>
    {#if selectedRecordsPerPage > 0 && onPageChange && updateRecordsPerPage && displayedRecords}
        <tr>
            <td colspan={colspan}>
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
                            <button type="button" class="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-lg last:rounded-e-lg border border-gray-200 text-gray-800 hover:bg-gray-100 hover:cursor-pointer focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10" aria-label="Previous"
                                onclick={() => { if( page > 1 ) onPageChange(page - 1)} } disabled={ page <= 1 }>
                                <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="m15 18-6-6 6-6"></path>
                                </svg>
                                <span class="hidden sm:block">Previous</span>
                            </button>
                            {#each { length:totalPages } , index }
                                <button type="button" class="min-h-9.5 min-w-9.5 flex justify-center items-center text-gray-800 border border-gray-200 py-2 px-3 text-sm first:rounded-s-lg last:rounded-e-lg hover:bg-gray-100 hover:cursor-pointer focus:outline-hidden focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-600 dark:border-neutral-700 dark:text-white dark:focus:bg-neutral-500 { page == index + 1 ? paginationActiveBackgroundColor : '' }" aria-current="page" onclick={() => onPageChange(index + 1)}>{index + 1}</button>
                            {/each}
                            <button type="button" class="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-lg last:rounded-e-lg border border-gray-200 text-gray-800 hover:bg-gray-100 hover:cursor-pointer focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10" aria-label="Next"
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
    {/if}
</tfoot>