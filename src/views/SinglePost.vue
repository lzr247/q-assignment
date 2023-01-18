<script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { fetchData } from '../utils/fetchData';
  import Post from '../components/Post.vue';

  const route = useRoute();
  const postData = ref();
  const postCommentsData = ref();
  const postUserData = ref();

  const postId = parseInt(route.params.id);

  onMounted(async () => {
    postData.value = await fetchData(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    postCommentsData.value = await fetchData(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    postUserData.value = await fetchData('https://jsonplaceholder.typicode.com/users');

    // Attach correct user to the post
    postUserData.value.forEach((user) => {
      if (user.id === postData.value.userId) {
        postData.value.userData = user;
      }
    })
  })
</script>

<template>
  <div class="post">
    <h1>Single post id: {{ postId }}</h1>
    <Post :postData="postData" :comments="postCommentsData"/>
  </div>
</template>