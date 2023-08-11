// Objects for state/year bar chart
var layout = 
{
  width: 1500,
  height: 900,
  title: {
    text: "Number of Stations by Year and State",
    font: {
      family: 'Arial',
      size: 24
    }},
  grid: {rows: 2, columns: 1, pattern: 'independent' },
  xaxis: { tickangle: -45,
    autorange : true,
      titlefont: {
          family: 'Arial, monospace',
          size: 14,
          color: '#7f7f7f'
      }
  },
  yaxis: {
      title: 'Number of Stations',
      titlefont: {
          family: 'Arial',
          size: 18,
          color: '#7f7f7f'
      }
  },
  showlegend: false
};

 // Objects for state/year bar chart
var config = {responsive: true};

// Load page function
function init() 
{
    fetch('/readjson')
      .then(response => response.json())
      .then(data => {
        console.log(data);

  // Get count of stations by state
  var stateCounts = data.reduce(function (result, station) {
    result[station.state] = (result[station.state] || 0) + 1; 
    return result;
  }, {});

  console.log(`initial state counts > ${JSON.stringify(stateCounts)}`);

  // Get count of stations by year/month
  var yearCounts = data.reduce(function (result, station) {
    var openDate = new Date(station.open_date);
    var yyyyMM =  moment(openDate).format('YYYY-MM');
    result[yyyyMM] = (result[yyyyMM] || 0) + 1; 
    return result;
  }, {});

  console.log(`initial year counts > ${JSON.stringify(yearCounts)}`);


    let stateData = {
      x: Object.keys(stateCounts),
      y: Object.values(stateCounts),
      xaxis: 'x1',
      yaxis: 'y1',
      text: Object.values(stateCounts),
      type: "bar",
      textposition: 'auto',
      marker: {
        color: 'blue',
        opacity: 0.6,
        line: {
          color: 'blue',
          width: 1.0
        }}
      };

    let yearData = {
    x: Object.keys(yearCounts),
    y: Object.values(yearCounts),
    xaxis: 'x2',
    yaxis: 'y2',
    text: Object.values(yearCounts),
    type: "bar",
    textposition: 'auto',
    marker: {
      color: 'green',
      opacity: 0.6,
      line: {
        color: 'green',
        width: 1.0
      }}
  };

  var plotdata=[stateData,yearData];
  Plotly.newPlot('plot', plotdata, layout, config );

  });
};

init();

// ------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------------

// Data for state/year bar chart
//  Function to update data based on drop down
function getDataByFuelType(data,fuelTypeCode) 
{

console.log(`fuelType > ${fuelTypeCode}`);

if (fuelTypeCode != "ALL")
    {
      var stateCounts = data.reduce(function (result, station) {
        var existsInResult = result[station.state];
        var withSameFuelType = station.fuel_type_code === fuelTypeCode;
        console.log(`fuelType > ${fuelTypeCode}`);
        console.log(`station.state > ${station.state}`);
        console.log(`station.fuel_type_code > ${station.fuel_type_code}`);
        console.warn("existsInResult stateCount", existsInResult);
        console.warn("withSameFuelType stateCount", withSameFuelType);
        let newCount = result[station.state];
        if (withSameFuelType) {
          if (!existsInResult) {
            newCount = 1;
          } else {
            newCount = result[station.state] + 1;
          }
        }

        result[station.state] = newCount; 
        console.warn("newCount stateCount", newCount);

        return result;
      }, {});
      
      console.log(`updated stateCount > ${JSON.stringify(stateCounts)}`);
      
      // Get count of stations by year/month
      var yearCounts = data.reduce(function (result, station) {
        var openDate = new Date(station.open_date);
        var yyyyMM =  moment(openDate).format('YYYY-MM');
        var existsInResult = result[yyyyMM];
        var withSameFuelType = station.fuel_type_code === fuelTypeCode;
        console.warn("existsInResult yearCounts", existsInResult);
        console.warn("withSameFuelType yearCounts", withSameFuelType);
        let newCount = result[yyyyMM];
        if (withSameFuelType) {
          if (!existsInResult) {
            newCount = 1;
          } else {
            newCount = result[yyyyMM] + 1;
          }
        }

        result[yyyyMM] = newCount; 
        return result;
      }, {});
      
      console.log(`updated yearCounts > ${JSON.stringify(yearCounts)}`);
    }
    else 
    {
      var stateCounts = data.reduce(function (result, station) {
        result[station.state] = ((result[station.state]) || 0) + 1; 
        return result;
      }, {});
      
      console.log(`updated stateCount > ${JSON.stringify(stateCounts)}`);
      
      // Get count of stations by year/month
      var yearCounts = data.reduce(function (result, station) {
        var openDate = new Date(station.open_date);
        var yyyyMM =  moment(openDate).format('YYYY-MM');
        result[yyyyMM] = ((result[yyyyMM]) || 0) + 1; 
        return result;
      }, {});
      
      console.log(`updated yearCounts > ${JSON.stringify(yearCounts)}`);
    }

let stateData = {
  x: Object.keys(stateCounts),
  y: Object.values(stateCounts),
  xaxis: 'x1',
  yaxis: 'y1',
  text: Object.values(stateCounts),
  type: "bar",
  textposition: 'auto',
  marker: {
    color: 'blue',
    opacity: 0.6,
    line: {
      color: 'blue',
      width: 1.0
    }}
  };

  let yearData = {
    x: Object.keys(yearCounts),
    y: Object.values(yearCounts),
    xaxis: 'x2',
    yaxis: 'y2',
    text: Object.values(yearCounts),
    type: "bar",
    textposition: 'auto',
    marker: {
      color: 'green',
      opacity: 0.6,
      line: {
        color: 'green',
        width: 1.0
      }}
  };

  return [stateData,yearData];
// });
};

// Drop Down Menu Actions
function getData() 
{
  let dropdownMenu = d3.select("#selDataset");
  let dataset = dropdownMenu.property("value");

  fetch('/readjson')
    .then(response => response.json())
    .then(data => {
    let plotdata = getDataByFuelType(data,dataset);

  console.log(`Reploting > ${JSON.stringify(plotdata)}`);
  Plotly.newPlot('plot', plotdata, layout, config );});
}
d3.selectAll("#selDataset").on("change", getData);