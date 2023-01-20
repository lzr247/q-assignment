<script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { fetchData } from '../utils/fetchData';
  import Post from '../components/Post.vue';
  import Loader from '../components/Loader.vue';

  const route = useRoute();
  const postData = ref();
  const postCommentsData = ref();
  const postUserData = ref();
  const fetchingState = ref(false);

  const postId = parseInt(route.params.id);

  onMounted(async () => {
    fetchingState.value = true;
    postData.value = await fetchData(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    postData.value.comments = await fetchData(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    postUserData.value = await fetchData('https://jsonplaceholder.typicode.com/users');

    // Attach correct user to the post
    postUserData.value.forEach((user) => {
      if (user.id === postData.value.userId) {
        postData.value.userData = user;
      }
    })

    fetchingState.value = false;
  })
</script>

<template>
  <div class="post">
    <Loader v-if="fetchingState"/>
    <Post v-else :postData="postData" :comments="postCommentsData"/>
  </div>
</template>