type IssueInfo = {
  year: number;
  number: number;
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
  faq?: FaqItem[];
};

type FaqItem = {
  question: string;
  answer: string;
};

type Streak = {
  start: IssueInfo;
  end: IssueInfo;
  released: boolean,
  count: number;
};
