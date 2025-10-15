<script lang="ts">
    const { tableData, columnKeys } = $props();
</script>

<tbody>
    {#each tableData as data}
        <!--For expanded rows create a new row after the clicked row
            it will accept the index of the selected row as parameter
            index would be used to retrieve the data from companies props
        -->
        <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
            {#each columnKeys as key}
                <td class="px-6 py-4">
                    { data[key] }
                </td>
            {/each}
        </tr>
    {/each}
</tbody>