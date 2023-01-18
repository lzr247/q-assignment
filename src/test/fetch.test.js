import { expect, test } from 'vitest';
import { fetchData } from '../utils/fetchData';

// Not really sure why, but vitest won't run fetch for node under v18 so had to import this
import fetch from "node-fetch";
globalThis.fetch = fetch;

test('Fetching will return truthy value', async () => {
  const data = fetchData('https://jsonplaceholder.typicode.com/users');
  expect(data).toBeTruthy();
})
