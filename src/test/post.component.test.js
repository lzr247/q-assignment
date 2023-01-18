import { mount } from '@vue/test-utils';
import Post from '../components/Post.vue';
import { expect } from 'vitest';
import { fetchData } from '../utils/fetchData';

import fetch from "node-fetch";
globalThis.fetch = fetch;

test("Mount post component and check postData prop", async () => {
  expect(Post).toBeTruthy();

  const data = fetchData('https://jsonplaceholder.typicode.com/users');

  const wrapper = mount(Post, {
    props: {
      postData: data
    }
  })

  expect(wrapper.props('postData')).toBe(data);
})