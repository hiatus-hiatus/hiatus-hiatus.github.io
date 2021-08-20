import { onMounted, Ref, ref } from "vue";

export default function useUserRepositories(): {
  seriesInfo: Ref<SeriesInfo>;
  loading: Ref<Boolean>;
} {
  const loading = ref(false);

  const seriesInfo = ref<SeriesInfo>({
    name: "",
    ongoing: false,
    marjorHiatusThreshold: 0,
    arcs: new Map<string, ArcInfo>(),
  });

  onMounted(async () => {
    try {
      loading.value = true;
      const response = await fetch("/HunterXHunter/info.json");
      const data = await response.json();

      for (const arc of data.arcs) {
        seriesInfo.value.arcs.set(arc.key, arc);
      }
      seriesInfo.value.name = data.series_name;
      seriesInfo.value.ongoing = data.ongoing;
      seriesInfo.value.marjorHiatusThreshold = data.marjorHiatusThreshold;
      seriesInfo.value.faq = data.faq;
    } finally {
      loading.value = false;
    }
  });

  return { seriesInfo, loading };
}
