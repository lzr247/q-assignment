<script setup>
  import { defineProps } from 'vue';
  import { useRouter, useRoute } from 'vue-router';

  const router = useRouter();
  const route = useRoute();

  const { postData, comments } = defineProps(['postData', 'comments'])

  const goBack = () => {
    router.push(`/posts`);
  }

</script>

<template>
  <div class="post" v-if="postData && comments">
    <div class="post-data">
      <div class="post-data-wrapper">
        <h3 class="username" v-if="postData.userData">{{ postData.userData.name }}</h3>
        <span v-if="route.path !== '/posts'" class="back" @click="goBack()">&lt-- Go back</span>
      </div>
      <h2 class="title">{{ postData.title }}</h2>
      <p class="body">{{ postData.body }}</p>  
    </div>
    <hr>
    <div class="comments">
      <div class="comment" v-for="comment in comments">
        <h4>{{ comment.email }}</h4>
        <p>{{ comment.body }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .post {
    border: 2px solid #407088;
    border-radius: 12px;
    padding: 14px 18px;
    background-color: var(--color-white);
    color:  var(--color-secondary);
    margin-bottom: 20px;
    cursor: pointer;
  }

  .post .post-data {
    margin-bottom: 18px;
  }

  .post .post-data .post-data-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .post .post-data .post-data-wrapper .back {
    font-weight: bold;
  }

  .post .comment {
    margin-top: 18px;
    border: 1px solid var(--color-secondary);
    padding: 8px 10px;
    border-radius: 12px;
  }
</style>