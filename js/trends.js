google.charts.setOnLoadCallback(prepareButtons);

// This function prepares the buttons, setting up the click events with jQuery that will trigger the charts
function prepareButtons() {
    drawDiffCharts();
    $("#over_time_column, #perc_change_over_time_column, #geo_spending, #geo_perc_change").hide();

    $("#spending_btn").click(function () {
        $("button").removeClass("enabled");
        $(this).toggleClass("enabled");

        $(".dashboard").hide();
        $("#over_time_column, #geo_spending").show();
        drawSpendingCharts();
    });

    $("#growth_btn").click(function () {
        $("button").removeClass("enabled");
        $(this).toggleClass("enabled");

        $(".dashboard").hide();
        $("#diff_over_time_column, #geo_diff").show();
        drawDiffCharts();
    });

    $("#perc_btn").click(function () {
        $("button").removeClass("enabled");
        $(this).toggleClass("enabled");

        $(".dashboard").hide();
        $("#perc_change_over_time_column, #geo_perc_change").show();
        drawPercChangeCharts();
    });
}

//Declaring lots of variables for queries and chart options
var overTimeQuery = "select C, A, sum(E) where C ends with ' Spending' group by C, A pivot D";
var differenceOverTimeQuery = "select C, A, sum(G) where C ends with ' Spending' group by C, A pivot D";
var percentChangeOverTimeQuery = "select C, A, sum(H) where C ends with ' Spending' group by C, A pivot D";

var geoSpendingQuery = "select C, A, D, E where C ends with ' Spending'";
var geoDiffQuery = "select C, A, D, G where C ends with ' Spending'";
var geoPercChangeQuery = "select C, A, D, H where C ends with ' Spending'";

var overTimeColumnOpts = {
    chartType: 'ColumnChart',
    containerId: 'over_time_column_chart',
    view: {columns: [1, 2, 3, 4, 5, 6, 7, 8]},
    options: {
        title: 'Education, Healthcare, and Military Spending over Time',
        hAxis: {textStyle: {fontSize: 12}},
        vAxis: {title: 'Billions ($)'},
        backgroundColor: '#F7F7F7',
        fontName: "Helvetica Neue",
        width: '100%',
        height: 500
    }
};

var differenceOverTimeColumnOpts = {
    chartType: 'ColumnChart',
    containerId: 'diff_over_time_column_chart',
    view: {columns: [1, 2, 3, 4, 5, 6, 7, 8]},
    options: {
        title: 'Growth in Education, Healthcare, and Military Spending over Time',
        backgroundColor: '#F7F7F7',
        fontName: "Helvetica Neue",
        hAxis: {textStyle: {fontSize: 12}},
        vAxis: {title: 'Billions ($), Change from Previous Year'},
        width: '100%',
        height: 500
    }
};

var percentChangeOverTimeColumnOpts = {
    chartType: 'ColumnChart',
    containerId: 'perc_change_over_time_column_chart',
    view: {columns: [1, 2, 3, 4, 5, 6, 7, 8]},
    options: {
        title: 'Growth in Education, Healthcare, and Military Spending over Time (% Change)',
        backgroundColor: '#F7F7F7',
        fontName: "Helvetica Neue",
        width: '100%',
        height: 500,
        hAxis: {textStyle: {fontSize: 12}},
        vAxis: {title: '% Change from Previous Year', format: '%#'},
    }
};

var geoSpendingOpts = {
    chartType: 'GeoChart',
    containerId: 'geo_spending_chart',
    view: {columns: [1, 3]},
    options: {
        datalessRegionColor: '#FFFFFF',
        defaultColor: '#505050',
        colorAxis: {colors: ['#ff1100', '#efd900', '#41cf1f']},
        backgroundColor: '#F7F7F7',
        legend: {
            numberFormat: '$#,### Billion'
        }
    }
};

var geoDiffOpts = {
    chartType: 'GeoChart',
    containerId: 'geo_diff_chart',
    view: {columns: [1, 3]},
    options: {
        datalessRegionColor: '#FFFFFF',
        defaultColor: '#505050',
        colorAxis: {colors: ['#ff1100', '#efd900', '#41cf1f']},
        backgroundColor: '#F7F7F7',
        legend: {
            numberFormat: '+$#,### Billion;-$#,### Billion'
        }
    }
};

var geoPercChangeOpts = {
    chartType: 'GeoChart',
    containerId: 'geo_perc_change_chart',
    view: {columns: [1, 3]},
    options: {
        datalessRegionColor: '#FFFFFF',
        defaultColor: '#505050',
        colorAxis: {colors: ['#ff1100', '#efd900', '#41cf1f']},
        backgroundColor: '#F7F7F7',
        legend: {
            numberFormat: '+#%;-#%'
        }
    }
};

//These functions are called by the prepareButtons function. They actually make the charts.
function drawSpendingCharts() {
    drawDashboard('totals_billions', overTimeQuery, 'over_time_column', overTimeColumnOpts, 8, [statFilterOpts]);
    drawDashboard('totals_billions', geoSpendingQuery, 'geo_spending', geoSpendingOpts, null, [statFilterOpts, yearFilterOpts]);
}

function drawDiffCharts() {
    drawDashboard('totals_billions', differenceOverTimeQuery, 'diff_over_time_column', differenceOverTimeColumnOpts, 8, [statFilterOpts]);
    drawDashboard('totals_billions', geoDiffQuery, 'geo_diff', geoDiffOpts, null, [statFilterOpts, yearFilterOpts]);
}

function drawPercChangeCharts() {
    drawDashboard('totals_billions', percentChangeOverTimeQuery, 'perc_change_over_time_column', percentChangeOverTimeColumnOpts, 8, [statFilterOpts]);
    drawDashboard('totals_billions', geoPercChangeQuery, 'geo_perc_change', geoPercChangeOpts, null, [statFilterOpts, yearFilterOpts]);
}