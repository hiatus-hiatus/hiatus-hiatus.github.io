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
    showFaq: false,
    arcs: new Map<string, ArcInfo>(),
    attribution: {
      sources: [],
      authors: [],
    },
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
      seriesInfo.value.showFaq = data.show_faq;
      seriesInfo.value.faq = data.faq;
      seriesInfo.value.attribution = data.attribution;
    } finally {
      loading.value = false;
    }
  });

  return { seriesInfo, loading };
}
