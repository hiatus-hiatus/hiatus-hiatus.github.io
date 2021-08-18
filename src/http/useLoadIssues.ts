import { onMounted, Ref, ref } from "vue";

export default function useUserRepositories(): {
  issues: Ref<IssueInfo[]>;
  loading: Ref<Boolean>;
} {
  const loading = ref(false);

  const issues = ref(new Array<IssueInfo>());

  onMounted(async () => {
    try {
      loading.value = true;
      const response = await fetch("/HunterXHunter/issues.json");
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
