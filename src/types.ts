type IssueInfo = {
    year: number,
    issue: number,
    released: boolean,
    arc?: string,
}

type ArcInfo = {
    key: string,
    name: string
}


type SeriesInfo = {
    arcs: ArcInfo[];
    name: string,
    ongoing: boolean,
    marjorHiatusThreshold: number

}