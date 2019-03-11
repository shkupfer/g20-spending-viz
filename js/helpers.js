// Load the Google charts
google.charts.load('current', {'packages': ['corechart', 'table', 'controls']});

//Declaring some constants that will be used in multiple other Javascript files
var sheetUrl = 'https://docs.google.com/spreadsheets/d/1yeI93Szo9JC-K2Z_8FSOmfv6mxc4PPlD6UAKVbJwnnY/gviz/tq?headers=1';

var statFilterOpts = {
    controlType: 'CategoryFilter',
    options: {
        filterColumnLabel: 'Statistic',
        ui: {
            label: 'Category:',
            caption: 'Select category...',
            allowNone: false,
            allowMultiple: false,
            labelStacking: 'vertical',
            cssClass: 'category_filter'
        },
        fontName: "Helvetica Neue"
    },
    state: {selectedValues: ['Healthcare Spending']},
};

var yearFilterOpts = {
    controlType: 'CategoryFilter',
    options: {
        filterColumnLabel: 'Year',
        ui: {
            label: 'Year:',
            caption: 'Select year...',
            allowNone: false,
            allowMultiple: false,
            labelStacking: 'vertical',
            cssClass: 'category_filter'
        },
        fontName: "Helvetica Neue"
    },
    state: {selectedValues: [2015]}
};

//This is where the dashboards (charts and filters) get made
function drawDashboard(sheetName, query, elementId, chartOptions, sortCol=null, filtersOptions=[]) {
    var gglQuery = new google.visualization.Query(sheetUrl + '&sheet=' + sheetName);
    gglQuery.setQuery(query);

    gglQuery.send(function(response) {
        var data = response.getDataTable();
        if (sortCol !== null) {
            data.sort({column: sortCol, desc: true});
        }

        var dashboard = new google.visualization.Dashboard(document.getElementById(elementId));

        var chart = new google.visualization.ChartWrapper(chartOptions);

        for (var i = 0; i < filtersOptions.length; i++) {
            var filterOptions = filtersOptions[i];
            filterOptions.containerId = elementId + '_filter_' + i;
            var filter = new google.visualization.ControlWrapper(filterOptions);
            dashboard.bind(filter, chart);
        }

        dashboard.draw(data);
    });
}