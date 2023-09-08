<template>
  <div class="w-full text-center p-5 space-x-3">
    <button
      @click="prevPage"
      :disabled="currentPage === 1"
      :class="currentPage === 1 ? '' : 'text-blue-600'"
    >
      Previous
    </button>
    <span>{{ currentPage }} - {{ totalPages }}</span>
    <button
      @click="nextPage"
      :disabled="currentPage === totalPages"
      :class="currentPage === totalPages ? '' : 'text-blue-600'"
    >
      Next
    </button>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  props: {
    totalItems: Number,
    itemsPerPage: Number,
  },
  setup(props, { emit }) {
    const currentPage = ref(1);

    const totalPages = computed(() =>
      Math.ceil(props.totalItems / props.itemsPerPage)
    );

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        emit("page-change", currentPage.value);
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
        emit("page-change", currentPage.value);
      }
    };

    return {
      currentPage,
      totalPages,
      prevPage,
      nextPage,
    };
  },
};
</script>
