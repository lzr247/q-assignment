<script setup>
  import { useRoute } from 'vue-router';

  const route = useRoute();

  const postId = parseInt(route.params.id);

</script>

<template>
  <div class="post">
    <h1>Single post id: {{ postId }}</h1>
  </div>
</template>