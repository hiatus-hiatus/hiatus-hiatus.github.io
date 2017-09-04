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
            "arcs": [
                {"key": "hiatus-arc", "name": "Great Hiatus Arc"},
                {"key": "hunter-exam", "name": "Hunter Exam"},
                {"key": "zoldyck", "name": "Zoldyck Family"},
                {"key": "heavens-arena", "name": "Heavens Arena"},
                {"key": "yorknew", "name": "Yorknew City"},
                {"key": "greed-island", "name": "Greed Island"},
                {"key": "chimera-ant", "name": "Chimera Ant"},
                {"key": "election", "name": "13th Hunter Chairman Election"},
                {"key": "dc", "name": "Dark Continent Expedition"},
                {"key": "oneshot", "name": "Kurapika's One Shot"}
            ],
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
            const that = this;
            axios.get("issues.json")
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

                    that.status.currentWidth = (that.status.current.hiatusCount / that.status.longest.hiatusCount / 0.01) + "%";
                    that.status.pubStreakWidth = (that.status.pubStreak.count / that.status.longest.hiatusCount / 0.01) + "%";
                    that.status.currentPubStreakWidth = (that.status.currentPubStreak.count / that.status.longest.hiatusCount / 0.01) + "%";
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
                                if (hiatus_count > 4) {
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

                    if (!last_issue.released && hiatus_count > 4) {
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

                    that.status.major_hiatuses = hiatuses;

                    that.initGraph(that.$refs.yearlyCanvas, 'line')

                })
            ;

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


                var chart = new Chart(canvas, {
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