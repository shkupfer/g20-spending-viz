google.charts.load('current', {
  callback: drawStuff,
  packages:['corechart', 'controls']
});

function drawStuff() {
  var dashboard = new google.visualization.Dashboard(
    document.getElementById('dashboard_div')
  );

  // Combined dataset
  var data = new google.visualization.arrayToDataTable([
    ['Status', 'Carlos', 'Josh'],
    ['Dual Approved', 5, 1],
    ['Approved', 7, 10],
    ['Review', 3, 2],
    ['Draft', 2, 9],
    ['Not In', 6, 10],
    ['Edit Rerun', 1, 3]
  ]);

  var programmaticFilter = new google.visualization.ControlWrapper({
    controlType: 'CategoryFilter',
    containerId: 'control_div',
    options: {
      filterColumnLabel: 'Status',
      ui: {
        labelStacking: 'vertical'
      }
    }
  });

  var programmaticChart_Carlos = new google.visualization.ChartWrapper({
    chartType: 'PieChart',
    containerId: 'chart_div_Carlos',
    options: {
      width: 290,
      height: 220,
      chartArea: {'left': 20, 'top': 20, 'right': 0, 'bottom': 0},
      pieSliceText: 'value',
      pieHole: 0.4,
      legend: {position: 'left', textStyle: {color: 'black', fontSize: 9, fontName: 'Garamond' }},
      pieSliceBorderColor: 'Black'
    },
    view: {
      columns: [0, 1]
    }
  });
  programmaticChart_Carlos.setOption('title', 'Carlos');

  var programmaticChart_Josh = new google.visualization.ChartWrapper({
    chartType: 'PieChart',
    containerId: 'chart_div_Josh',
    options: {
      width: 290,
      height: 220,
      chartArea: {'left': 20, 'top': 20, 'right': 0, 'bottom': 0},
      pieSliceText: 'value',
      pieHole: 0.4,
      legend: {position: 'left', textStyle: {color: 'black', fontSize: 9, fontName: 'Garamond' }},
      pieSliceBorderColor: 'Black'
    },
    view: {
      columns: [0, 2]
    }
  });
  programmaticChart_Josh.setOption('title', 'Josh');

  dashboard.bind(
    programmaticFilter,
    [programmaticChart_Carlos, programmaticChart_Josh]
  );
  dashboard.draw(data);
}