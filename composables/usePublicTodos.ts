// Simple public API fetch using Nuxt's useFetch
// SSR-safe: data is fetched on the server and hydrated to the client

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export function usePublicTodos(limit: number | Ref<number> = 5) {
  const l = computed(() => (typeof limit === "number" ? limit : limit.value));
  return useFetch<Todo[]>("https://jsonplaceholder.typicode.com/todos", {
    query: computed(() => ({ _limit: l.value })),
    key: () => `public-todos-${l.value}`,
    server: true, // fetch on server during SSR; hydrated on client
    default: () => [],
    watch: [l],
  });
}
