<template>
  <div class="">
    <h1 class="font-bold text-4xl mb-5 mx-5">Users List</h1>
    <div class="overflow-y-auto">
      <table class="min-w-full">
        <thead>
          <tr>
            <th
              class="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
              v-for="(column, i) in columns"
              :key="i"
            >
              {{ column }}
            </th>
            <th
              class="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              street address
            </th>
            <th
              class="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              Zip code
            </th>
            <th
              class="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              Company name
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            :class="i % 2 == 0 ? 'bg-white' : 'bg-gray-100'"
            v-for="(user, i) in paginatedUsers"
            :key="i"
          >
            <td
              class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
              v-for="(column, j) in columns"
              :key="j"
            >
              {{ user[column] }}
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              {{ user["address"]["street"] }}
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              {{ user["address"]["zipcode"] }}
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              {{ user["company"]["name"] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <pagination
      :total-items="users.length"
      :items-per-page="itemsPerPage"
      @page-change="onPageChange"
    />
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

import Pagination from "@/components/PaginationComponent.vue";

export default {
  components: {
    Pagination,
  },
  setup() {
    const columns = ["username", "email", "name"];
    const itemsPerPage = 5;

    const store = useStore();

    const users = ref(computed(() => store.getters.getUsers).value);

    if (users.value.length == 0) {
      store.dispatch("fetchUsers").then(() => {
        users.value = computed(() => store.getters.getUsers).value;
      });
    }

    const currentPage = ref(1);

    const paginatedUsers = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return users.value.slice(startIndex, endIndex);
    });

    const onPageChange = (page) => {
      currentPage.value = page;
    };

    return { columns, users, paginatedUsers, itemsPerPage, onPageChange };
  },
};
</script>

<style lang="scss" scoped></style>
