<template>
  <NavbarComponent></NavbarComponent>
  <main class="container mx-auto my-5">
    <router-view />
  </main>
</template>

<script>
import NavbarComponent from "./components/global/NavbarComponent.vue";

export default {
  setup() {
    return {};
  },
  components: { NavbarComponent },
};
</script>
