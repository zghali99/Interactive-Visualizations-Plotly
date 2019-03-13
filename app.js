function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  d3.json(url).then(function(data) {
    console.log(data);
  });
    // Use d3 to select the panel with id of `#sample-metadata`
    var metadata_sample = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    metadata_sample.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    data.forEach(element => {
      var tRow = tbody.append("tr");
      Object.entries(element).forEach(([key, value]) => {
        console.log(`The key is: ${key} and it has a value of ${value}`);
        var tData = tRow.append("td");
        tData.text(value);
        var cell = tbody.append("td");
    })

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var url = "";
  d3.json(url).then(function(response) {
    console.log(response);
    var data = [response];
    
    // @TODO: Build a Bubble Chart using the sample data
    var layout = {
      mode: 'markers',
      showlegend: false,
      size: [40, 60, 80, 100],
      title: "",
      xaxis: {
        title: ""
      },
      yaxis: {
        title: ""
      }
    };
    Plotly.newPlot("", data, layout);
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
  })
}
buildCharts();

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
