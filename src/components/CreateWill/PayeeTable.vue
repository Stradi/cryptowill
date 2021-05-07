<template>
  <div class="overflow-x-auto">
    <table class="table-fixed mx-auto">
      <thead class="text-yellow-500">
        <th @click="sort('coin')" class="py-2 select-none w-2/12 transition duration-200 ease-out hover:text-yellow-600 transform hover:-translate-y-0.5">Coin
          <span>
            {{ currentSortingRow === 'coin' && currentSortDirection == "asc" ? " ▲" : " ▼" }}
          </span>
        </th>
        <th @click="sort('percentage')" class="select-none w-4/12 transition duration-200 ease-out hover:text-yellow-600 transform hover:-translate-y-0.5">Percentage
          <span>
            {{ currentSortingRow === 'percentage' && currentSortDirection == "asc" ? " ▲" : " ▼"}}
            </span>
          </th>
        <th @click="sort('address')" class="select-none transition duration-200 ease-out hover:text-yellow-600 transform hover:-translate-y-0.5">Address
          <span>
            {{ currentSortingRow === 'address' && currentSortDirection == "asc" ? " ▲" : " ▼"}}
          </span>
        </th>
        <th class="select-none w-1/12 transition duration-200 ease-out hover:text-yellow-600 transform hover:-translate-y-0.5">Actions</th>
      </thead>
      <tbody class="">
        <tr v-for="payee, idx in sortedItems" :key="idx" class="bg-gray-800 transition duration-200 ease-out hover:bg-opacity-50 hover:bg-gray-900 hover:text-gray-200">
          <td class="border-2 border-gray-700 px-2 py-1">{{ payee.coin }}</td>
          <td class="border-2 border-gray-700 px-2 py-1">{{ payee.percentage }}</td>
          <td class="border-2 border-gray-700 px-2 py-1">{{ payee.address }}</td>
          <td class="border-2 border-gray-700 px-2 py-1 transition duration-200 ease-out hover:text-yellow-500">
            <a href="#">Edit</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  debug: sort={{ currentSortingRow }}, dir={{ currentSortDirection }}
</template>

<script>
export default {
  name: "PayeeTable",
  props: ["items"],
  data: () => {
    return {
      currentSortingRow: "coin",
      currentSortDirection: "asc"
    }
  },
  methods: {
    sort(sortingRow) {
      if(sortingRow == this.currentSortingRow) {
        this.currentSortDirection = this.currentSortDirection == "asc" ? "desc" : "asc";
      }
      this.currentSortingRow = sortingRow;
    }
  },
  computed: {
    sortedItems: function() {
      return this.items.sort((a, b) => {
        let mod = 1;
        if(this.currentSortDirection === "desc") {
          mod = -1;
        }

        if(a[this.currentSortingRow] < b[this.currentSortingRow]) {
          return -1 * mod;
        }

        if(a[this.currentSortingRow] > b[this.currentSortingRow]) {
          return 1 * mod;
        }

        return 0;
      });
    }
  }
}
</script>