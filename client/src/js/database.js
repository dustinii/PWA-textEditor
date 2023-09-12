import { openDB } from 'idb';

const DATABASE_NAME = 'jate';
const STORE_NAME = 'jate';

// Helper function to get the object store
const getStore = async (mode = 'readonly') => {
  const db = await openDB(DATABASE_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        console.log('jate database created');
      }
    },
  });
  const tx = db.transaction(STORE_NAME, mode);
  return tx.objectStore(STORE_NAME);
};

// Method to add content to the IndexedDB database
export const putDb = async (content) => {
  console.log('PUT to the database');
  const store = await getStore('readwrite');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('data saved to the database', result?.value ?? 'No data saved');
};

// Method to get content from the IndexedDB database
export const getDb = async () => {
  console.log('GET from the database');
  const store = await getStore();
  const result = await store.get(1);
  console.log('data retrieved from the database', result?.value ?? 'No data found');
  return result?.value;
};
