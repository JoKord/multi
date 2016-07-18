define(['goog!visualization,1,packages:[corechart]'], function () {
    "use strict";
    return {
        addPieChart: function (el, data, opt) {
            var chartData = new google.visualization.arrayToDataTable(data);
            var chart = new google.visualization.PieChart(document.getElementById(el));
            chart.draw(chartData, opt);
        },
        addColumnChart: function (el, data, opt) {
            var chartData = new google.visualization.arrayToDataTable(data);
            var chart = new google.visualization.ColumnChart(document.getElementById(el));
            chart.draw(chartData, opt);
        }
    };
});