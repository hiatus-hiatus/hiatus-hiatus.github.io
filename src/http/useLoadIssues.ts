import { onMounted, Ref, ref } from "vue";

export default function useUserRepositories(dir: string): {
  issues: Ref<IssueInfo[]>;
  loading: Ref<Boolean>;
} {
  const loading = ref(false);

  const issues = ref(new Array<IssueInfo>());

  onMounted(async () => {
    try {
      loading.value = true;
      const response = await fetch(`/data/${dir}/issues.json`);
      issues.value = await response.json();
    } finally {
      loading.value = false;
    }
  });

  return {
    issues,
    loading,
  };
}
