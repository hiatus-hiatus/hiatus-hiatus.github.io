type IssueInfo = {
  year: number;
  issue: number;
  released: boolean;
  arc?: string;
};

type ArcInfo = {
  key: string;
  name: string;
  color: string;
};

type SeriesInfo = {
  arcs: Map<string, ArcInfo>;
  name: string;
  ongoing: boolean;
  marjorHiatusThreshold: number;
};
