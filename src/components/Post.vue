<script setup>
  import { defineProps } from 'vue';

  const { postData, comments } = defineProps(['postData', 'comments'])

</script>

<template>
  <div class="post" v-if="postData && comments">
    <h3>{{ postData.userData.username }}</h3>
    <h1>{{ postData.title }}</h1>
    <p>{{ postData.body }}</p>
    <div class="comments">
      <div v-for="comment in comments">
        <h4>{{ comment.email }}</h4>
        <p>{{ comment.body }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .post {
    border: 3px solid black;
  }
</style>