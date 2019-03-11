google.charts.setOnLoadCallback(prepareButtons);

function prepareButtons() {
    drawSpendingTotalsCharts();
    $("#spending_gdp_column, #spending_percapita_column, #geo_gdp, #geo_percapita").hide();

    $("#spending_totals_btn").click(function () {
        $("button").removeClass("enabled");
        $(this).toggleClass("enabled");

        $(".dashboard").hide();
        $("#spending_totals_column, #geo_spending_totals").show();
        drawSpendingTotalsCharts();
    });

    $("#spending_gdp_btn").click(function () {
        $("button").removeClass("enabled");
        $(this).toggleClass("enabled");

        $(".dashboard").hide();
        $("#spending_gdp_column, #geo_gdp").show();
        drawGDPCharts();
    });

    $("#spending_percapita_btn").click(function () {
        $("button").removeClass("enabled");
        $(this).toggleClass("enabled");

        $(".dashboard").hide();
        $("#spending_percapita_column, #geo_percapita").show();
        drawPerCapitaCharts();
    });
}

var spendingQuery = "select A, D, sum(E) group by A, D pivot C";
var geoSpendingQuery = "select A, C, D, E where C ends with ' Spending'";

var spendingPerCapQuery = "select A, D, sum(E) group by A, D pivot C";
var geoSpendingPerCapQuery = "select A, C, D, E";

var spendingTotalChartOpts = {
    chartType: 'ColumnChart',
    containerId: 'spending_totals_column_chart',
    view: {columns: [0, 2, 4, 5]},
    options: {
        title: 'Education, Healthcare, and Military Spending',
        vAxis: {title: 'Billions ($)'},
        hAxis: {textStyle: {fontSize: 12}},
        bar: {groupWidth: '80%'},
        backgroundColor: '#F7F7F7',
        fontName: "Helvetica Neue",
        width: '100%',
        height: 500
    }
};

var spendingGDPChartOpts = {
    chartType: 'ColumnChart',
    containerId: 'spending_gdp_column_chart',
    view: {columns: [0, 2, 3, 4]},
    options: {
        title: 'Education, Healthcare, and Military Spending as Percentage of GDP',
        vAxis: {title: '% of GDP', format: '#%'},
        hAxis: {textStyle: {fontSize: 12}},
        bar: {groupWidth: '80%'},
        backgroundColor: '#F7F7F7',
        fontName: "Helvetica Neue",
        width: '100%',
        height: 500}
};

var spendingPerCapitaChartOpts = {
    chartType: 'ColumnChart',
    containerId: 'spending_percapita_column_chart',
    view: {columns: [0, 2, 3, 4, 5]},
    options: {
        title: 'Education, Healthcare, Military Spending, and GDP per Capita',
        vAxis: {title: '$ per Capita', format: '$#,###'},
        hAxis: {textStyle: {fontSize: 12}},
        bar: {groupWidth: '80%'},
        backgroundColor: '#F7F7F7',
        fontName: "Helvetica Neue",
        width: '100%',
        height: 500}
};

var geoSpendingTotalChartOpts = {
    chartType: 'GeoChart',
    containerId: 'geo_spending_totals_chart',
    view: {columns: [0, 3]},
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

var geoGDPChartOpts = {
    chartType: 'GeoChart',
    containerId: 'geo_gdp_chart',
    view: {columns: [0, 3]},
    options: {
        datalessRegionColor: '#FFFFFF',
        defaultColor: '#505050',
        colorAxis: {colors: ['#ff1100', '#efd900', '#41cf1f']},
        backgroundColor: '#F7F7F7',
        legend: {
            numberFormat: '#%'
        }
    }
};

var geoPerCapitaChartOpts = {
    chartType: 'GeoChart',
    containerId: 'geo_percapita_chart',
    view: {columns: [0, 3]},
    options: {
        datalessRegionColor: '#FFFFFF',
        defaultColor: '#505050',
        colorAxis: {colors: ['#ff1100', '#efd900', '#41cf1f']},
        backgroundColor: '#F7F7F7',
        legend: {
            numberFormat: '$#,###'
        }
    }
};

// function drawAllCharts() {
//     drawDashboard('totals_billions', spendingQuery, 'spending_totals_column', spendingTotalChartOpts, 3, [yearFilterOpts]);
//     drawDashboard('percent_of_gdp', spendingQuery, 'spending_gdp_column', spendingGDPChartOpts, 5, [yearFilterOpts]);
//     drawDashboard('per_capita', spendingQuery, 'spending_percapita_column', spendingPerCapitaChartOpts, 3, [yearFilterOpts]);
//
//     drawDashboard('totals_billions', geoSpendingQuery, 'geo_spending_totals', geoSpendingTotalChartOpts, null, [statFilterOpts, yearFilterOpts]);
//     drawDashboard('percent_of_gdp', geoSpendingQuery, 'geo_gdp', geoGDPChartOpts, null, [statFilterOpts, yearFilterOpts]);
//     drawDashboard('per_capita', geoSpendingQuery, 'geo_percapita', geoPerCapitaChartOpts, null, [statFilterOpts, yearFilterOpts]);
// }

function drawSpendingTotalsCharts() {
    drawDashboard('totals_billions', spendingQuery, 'spending_totals_column', spendingTotalChartOpts, 3, [yearFilterOpts]);
    drawDashboard('totals_billions', geoSpendingQuery, 'geo_spending_totals', geoSpendingTotalChartOpts, null, [statFilterOpts, yearFilterOpts]);
}

function drawGDPCharts() {
    drawDashboard('percent_of_gdp', spendingQuery, 'spending_gdp_column', spendingGDPChartOpts, 5, [yearFilterOpts]);
    drawDashboard('percent_of_gdp', geoSpendingQuery, 'geo_gdp', geoGDPChartOpts, null, [statFilterOpts, yearFilterOpts]);
}

function drawPerCapitaCharts() {
    drawDashboard('per_capita', spendingQuery, 'spending_percapita_column', spendingPerCapitaChartOpts, 3, [yearFilterOpts]);
    drawDashboard('per_capita', geoSpendingPerCapQuery, 'geo_percapita', geoPerCapitaChartOpts, null, [statFilterOpts, yearFilterOpts]);
}