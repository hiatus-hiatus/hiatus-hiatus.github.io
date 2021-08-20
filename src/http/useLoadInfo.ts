import { onMounted, Ref, ref } from "vue";

export default function useUserRepositories(dir: string): {
  seriesInfo: Ref<SeriesInfo>;
  loading: Ref<Boolean>;
} {
  const loading = ref(false);

  const seriesInfo = ref<SeriesInfo>({
    name: "",
    ongoing: false,
    streaksThreshold: 0,
    arcs: new Map<string, ArcInfo>(),
  });

  onMounted(async () => {
    try {
      loading.value = true;
      const response = await fetch(`/data/${dir}/info.json`);
      const data = await response.json();

      for (const arc of data.arcs) {
        seriesInfo.value.arcs.set(arc.key, arc);
      }
      seriesInfo.value.name = data.series_name;
      seriesInfo.value.ongoing = data.ongoing;
      seriesInfo.value.streaksThreshold = data.streaks_threshold;
      seriesInfo.value.faq = data.faq;
    } finally {
      loading.value = false;
    }
  });

  return { seriesInfo, loading };
}
