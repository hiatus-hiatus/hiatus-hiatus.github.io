var BASE_NAME = "/" + window.location.pathname.split('/')[1];


if (BASE_NAME === "/" || BASE_NAME === "/index.html") {
    BASE_NAME = "/HunterXHunter";
    document.getElementById("custom_style").href = BASE_NAME + "/style.css";
}

var INFO_PATH = BASE_NAME + "/info.json";
var ISSUES_PATH = BASE_NAME + "/issues.json";


var app = new Vue({
        el: '#app',
        data: {
            all_issues: [],
            status: {
                current: {
                    begin: {},
                    hiatusCount: 0
                },
                longest: {
                    begin: {},
                    end: {},
                    hiatusCount: 0
                },
                pubStreak: {
                    begin: {},
                    end: {},
                    count: 0
                },
                currentPubStreak: {
                    begin: {},
                    count: 0
                },
                overall: {
                    totalIssues: 0,
                    totalPresent: 0,
                    totalHiatus: 0
                }
            },
            show_arcs: false,
            info: {},
            major_hiatuses: []
        },
        computed: {
            issues_by_year: function () {
                var data = [];
                var t = _.groupBy(this.all_issues, 'year');
                Object.keys(t)
                    .sort()
                    .reverse()
                    .forEach(function (key) {
                        data.push({year: key, issues: _.sortBy(t[key], ['number'])})
                    });
                return data;
            },

            hiatuses_by_year: function () {

                var data = [];

                this.issues_by_year.forEach(function (group) {
                    var total_released = _.sumBy(group.issues, function (issue) {
                        return issue.released ? 1 : 0;
                    });

                    var total_issues = group.issues.length;

                    var total_hiatus = total_issues - total_released;

                    var percent = (total_hiatus / total_issues / 0.01).toFixed(0);


                    data.push({
                        'year': group.year,
                        'total_hiatus': total_hiatus,
                        'total_released': total_released,
                        'total_issues': total_issues,
                        'percent': percent


                    });
                });
                return data;

            }
        },
        mounted: function () {
            var that = this;
            axios.get(INFO_PATH)
                .then(function (response) {
                    that.info = response.data;
                    document.title = that.info.series_name + " Hiatus Chart";
                }).then(function () {
                axios.get(ISSUES_PATH)
                    .then(function (response) {
                        that.all_issues = response.data;

                        var count = 0;
                        var countPresent = 0;

                        var currentYear = 0;
                        var currentYearPresent = 0;
                        var initIssue = 0;
                        var initIssuePresent = 0;

                        var lastIssue;


                        _.sortBy(that.all_issues, ['year', 'number']).forEach(function (issue) {
                            that.status.overall.totalIssues++;
                            if (!issue.released) {
                                that.status.overall.totalHiatus++;
                                if (countPresent > that.status.pubStreak.count) {
                                    that.status.pubStreak.count = countPresent;
                                    that.status.pubStreak.begin.year = currentYearPresent;
                                    that.status.pubStreak.begin.issue = initIssuePresent;
                                    that.status.pubStreak.end.year = lastIssue.year;
                                    that.status.pubStreak.end.issue = lastIssue.number;
                                }
                                countPresent = 0;


                                if (count === 0) {
                                    currentYear = issue.year;
                                    initIssue = issue.number;
                                }
                                count++;


                            }
                            else {
                                that.status.overall.totalPresent++;
                                if (count > that.status.longest.hiatusCount) {
                                    that.status.longest.hiatusCount = count;
                                    that.status.longest.begin.year = currentYear;
                                    that.status.longest.begin.issue = initIssue;
                                    that.status.longest.end.year = lastIssue.year;
                                    that.status.longest.end.issue = lastIssue.number;

                                }
                                count = 0;


                                if (countPresent === 0) {
                                    currentYearPresent = issue.year;
                                    initIssuePresent = issue.number;
                                }
                                countPresent++;
                            }
                            lastIssue = issue;
                        });


                        that.status.current.hiatusCount = count;
                        that.status.current.begin.issue = initIssue;
                        that.status.current.begin.year = currentYear;

                        if (that.status.current.hiatusCount > that.status.longest.hiatusCount) {
                            that.status.longest.hiatusCount = that.status.current.hiatusCount;
                            that.status.longest.begin.year = that.status.current.begin.year;
                            that.status.longest.begin.issue = that.status.current.begin.issue;
                            that.status.longest.end.year = lastIssue.year;
                            that.status.longest.end.issue = lastIssue.number;
                        }

                        that.status.currentPubStreak.count = countPresent;
                        that.status.currentPubStreak.begin.issue = initIssuePresent;
                        that.status.currentPubStreak.begin.year = currentYearPresent;

                        if (that.status.currentPubStreak.count > that.status.pubStreak.count) {
                            that.status.pubStreak.count = that.status.currentPubStreak.count;
                            that.status.pubStreak.begin.year = that.status.currentPubStreak.begin.year;
                            that.status.pubStreak.begin.issue = that.status.currentPubStreak.begin.issue;
                            that.status.pubStreak.end.year = lastIssue.year;
                            that.status.pubStreak.end.issue = lastIssue.number;
                        }

                        that.status.arcs = [];


                        var largest = Math.max(that.status.current.hiatusCount, that.status.longest.hiatusCount, that.status.pubStreak.count);


                        that.status.currentWidth = (that.status.current.hiatusCount / largest / 0.01) + "%";
                        that.status.longestWidth = (that.status.longest.hiatusCount / largest / 0.01) + "%";
                        that.status.pubStreakWidth = (that.status.pubStreak.count / largest / 0.01) + "%";
                        that.status.currentPubStreakWidth = (that.status.currentPubStreak.count / largest / 0.01) + "%";
                        that.status.pTotalPresent = (that.status.overall.totalPresent / that.status.overall.totalIssues / 0.01) + "%";
                        that.status.pTotalHiatus = (that.status.overall.totalHiatus / that.status.overall.totalIssues / 0.01) + "%";


                        // extract major hiatuses

                        var last_issue = {};
                        var hiatus_count = 0;
                        var last_begin = {};

                        var hiatuses = [];
                        var greatest = 0;
                        _.sortBy(that.all_issues, ['year', 'number']).forEach(function (issue) {
                            if (last_issue) {
                                if (last_issue.released && !issue.released) {
                                    hiatus_count = 0;
                                    last_begin = issue;
                                }
                                else if (!last_issue.released && issue.released) {
                                    if (hiatus_count > that.info.major_hiatus_threshold) {
                                        hiatuses.push({
                                            start: last_begin.year + '/' + last_begin.number,
                                            end: last_issue.year + '/' + last_issue.number,
                                            total: hiatus_count
                                        });
                                        if (hiatus_count > greatest) {
                                            greatest = hiatus_count;
                                        }
                                    }

                                }

                            }
                            last_issue = issue;
                            if (!issue.released) {
                                hiatus_count++;
                            }
                        });

                        if (!last_issue.released && hiatus_count >= that.info.major_hiatus_threshold) {
                            hiatuses.push({
                                start: last_begin.year + '/' + last_begin.number,
                                end: '??',
                                total: hiatus_count
                            });
                            if (hiatus_count > greatest) {
                                greatest = hiatus_count;
                            }
                        }

                        for (var i = 0; i < hiatuses.length; i++) {
                            hiatuses[i].viewProportion = (hiatuses[i].total / greatest / 0.01) + "%";
                        }
                        that.major_hiatuses = hiatuses;

                        that.initGraph(that.$refs.yearlyCanvas, 'line')

                    })
                ;
            });

            window.disqus_config = function () {
                if (BASE_NAME === "/HunterXHunter") {
                    this.page.url = "https://hiatus-hiatus.rhcloud.com/";
                }
                else {
                    this.page.url = "https://hiatus-hiatus.github.io" + BASE_NAME;
                }
            };
            (function () {
                var d = document, s = d.createElement('script');

                s.src = '//hiatus-hiatus.disqus.com/embed.js';

                s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s);
            })();


        },
        methods: {

            initGraph: function (canvas, type) {
                var mapToYear = function (info) {
                    return info.year;
                };
                var mapToTotalReleased = function (info) {
                    return info.total_released;
                };

                var data = _.sortBy(this.hiatuses_by_year, ['year']);


                var labels = data.map(mapToYear);

                var dataset = data.map(mapToTotalReleased);


                new Chart(canvas, {
                    type: type,
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                data: dataset
                            }]
                    },
                    options: {
                        animation: {
                            animateScale: true
                        },
                        legend: {
                            display: false
                        },
                        maintainAspectRatio: false

                    }
                });
            }
        }
    })
;
