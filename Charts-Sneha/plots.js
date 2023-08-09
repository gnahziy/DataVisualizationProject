var layout = { 
  title: '#Stations by Year and State',
    height: 1000,
    width: 1500,
  grid: {rows: 2, columns: 1, pattern: 'independent', roworder: 'bottom to top' }
};

var config = {responsive: true};

function getDataByFuelType(fuelTypeCode) {
  console.log(`fuelType > ${fuelTypeCode}`);

  var stateCounts = data.reduce(function (result, station) {
    result[station.state] = ((result[station.state] && station.fuel_type_code === fuelTypeCode) || 0) + 1; 
    return result;
  }, {});
  
  console.log(`updated stateCount > ${JSON.stringify(stateCounts)}`);
  
  // Objects for state bar chart
  let stateData = {
    x: Object.keys(stateCounts),
    y: Object.values(stateCounts),
    xaxis: 'x1',
    yaxis: 'y1',
    text: Object.values(stateCounts),
    type: "bar",
    marker: {
      color: 'blue',
      line: {
          width: 0.5
      }}
    };
  
  // -----------------------------------------------------------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------------------------------------------------
  
  // Get count of stations by year/month
  var yearCounts = data.reduce(function (result, station) {
    var openDate = new Date(station.open_date);
    var yyyyMM =  moment(openDate).format('YYYY-MM');
    result[yyyyMM] = ((result[yyyyMM] && station.fuel_type_code === fuelTypeCode) || 0) + 1; 
    return result;
  }, {});
  
  console.log(`updated yearCounts > ${JSON.stringify(yearCounts)}`);

  let yearData = {
    x: Object.keys(yearCounts),
    y: Object.values(yearCounts),
    xaxis: 'x2',
    yaxis: 'y2',
    text: Object.values(yearCounts),
    type: "bar",
    marker: {
      color: 'green',
      line: {
          width: 0.5
      }
  }};

  return [yearData, stateData];
}



function init() {
  // Get count of stations by state
  var stateCounts = data.reduce(function (result, station) {
    result[station.state] = (result[station.state] || 0) + 1; 
    return result;
  }, {});

  console.log(`initial state counts > ${JSON.stringify(stateCounts)}`);
  // ADD SORT HERE
  // ADD SORT HERE

  // Objects for state bar chart
  let stateData = {
    x: Object.keys(stateCounts),
    y: Object.values(stateCounts),
    xaxis: 'x1',
    yaxis: 'y1',
    text: Object.values(stateCounts),
    type: "bar",
    marker: {
      color: 'blue',
      line: {
          width: 0.5
      }}
    };

  let stateLayout = {
    title: "Station Counts By State"
  };

  // -----------------------------------------------------------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------------------------------------------------

  // Get count of stations by year/month
  var yearCounts = data.reduce(function (result, station) {
    var openDate = new Date(station.open_date);
    var yyyyMM =  moment(openDate).format('YYYY-MM');
    result[yyyyMM] = (result[yyyyMM] || 0) + 1; 
    return result;
  }, {});

  console.log(`initial year counts > ${JSON.stringify(yearCounts)}`);

  // ADD SORT HERE
  // ADD SORT HERE

  // Objects for year/month bar chart
  let yearData = {
    x: Object.keys(yearCounts),
    y: Object.values(yearCounts),
    xaxis: 'x2',
    yaxis: 'y2',
    text: Object.values(yearCounts),
    type: "bar",
    marker: {
      color: 'green',
      line: {
          width: 0.5
      }
  }};

  let yearLayout = {
    title: "Station Counts By Month"
  };

  // -----------------------------------------------------------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------------------------------------------------



  // -----------------------------------------------------------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------------------------------------------------

  var plotdata=[yearData,stateData];



  Plotly.newPlot('plot', plotdata, layout, config );

}

init();


d3.selectAll("#selDataset").on("change", getData);

function getData() {
  let dropdownMenu = d3.select("#selDataset");
  let dataset = dropdownMenu.property("value");
  let plotdata = getDataByFuelType(dataset);

  console.log(`Reploting > ${JSON.stringify(plotdata)}`);
  Plotly.newPlot('plot', plotdata, layout, config );
}

