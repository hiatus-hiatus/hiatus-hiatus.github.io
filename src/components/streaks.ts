import { computed, Ref, ref } from "vue";

export default function useStreaks(issues: IssueInfo[]): {
  streaks: Ref<Array<Streak>>;
} {
  const streaks = ref([] as Streak[]);

  let info = [...issues].reverse().reduce(
    (info, issue) => {
      if (info.current && issue.released == info.current.released) {
        info.current.count++;
        info.current.end = issue;
      } else {
        let streak = {
          start: issue,
          end: issue,
          count: 1,
          released: issue.released,
        };
        info.current = streak;
        info.streaks.push(streak);
      }
      return info;
    },
    { streaks: [] as Streak[], current: null as null | Streak }
  );
  streaks.value = info.streaks;
  return { streaks };
}
