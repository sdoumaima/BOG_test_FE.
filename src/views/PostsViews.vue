<template>
  <div class="mx-5">
    <h1 class="font-bold text-4xl mb-5">Posts</h1>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      <!-- posts card -->
      <div
        class="bg-white rounded-lg shadow-sm p-6"
        v-for="(post, i) in paginatedPosts"
        :key="i"
      >
        <h2 class="text-2xl font-semibold mb-2">{{ post.title }}</h2>

        <p class="mt-2 mb-2">
          {{ post.body }}
        </p>
        <span class="text-sm">Creator: {{ post.user.username }}</span>

        <!-- Buttons for actions -->
        <div class="mt-4" v-if="isLogin">
          <button class="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">
            View
          </button>
          <button class="px-4 py-2 bg-yellow-500 text-white rounded-md mr-2">
            Edit
          </button>
          <button class="px-4 py-2 bg-red-500 text-white rounded-md">
            Delete
          </button>
        </div>
      </div>
    </div>
    <pagination
      :total-items="posts.length"
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
    const store = useStore();
    const itemsPerPage = 6;

    const posts = ref(computed(() => store.getters.getPosts).value);

    if (posts.value.length == 0) {
      store.dispatch("fetchPosts").then(() => {
        posts.value = computed(() => store.getters.getPosts).value;
      });
    }

    const currentPage = ref(1);
    const isLogin = computed(() => store.state.isLogin);

    const paginatedPosts = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return posts.value.slice(startIndex, endIndex);
    });

    const onPageChange = (page) => {
      currentPage.value = page;
    };

    return {
      posts,
      paginatedPosts,
      itemsPerPage,
      onPageChange,
      isLogin,
    };
  },
};
</script>

<style lang="scss" scoped></style>
