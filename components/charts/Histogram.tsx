"use client"

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Histogram = ({ data }) => {

    while (document.getElementById("histogram")?.firstChild) {
        document.getElementById("histogram").removeChild(document.getElementById("histogram").lastChild);
    }

    // Sample data (replace with your actual data)
    const chartData = data || [1, 2, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // Define margin for the chart
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    // Define width and height of the chart area
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Select the SVG element
    const svg = d3.select(document.getElementById("histogram"))
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    // Define the x-scale (bins)
    const x = d3.scaleLinear()
      .domain([d3.min(chartData), d3.max(chartData)])
      .range([0, width]);

    // Create the histogram layout with 10 bins
    const histogram = d3.histogram()
      .value(d => d) // Accessor function for the data value
      .domain(x.domain())  // Domain for the bins
      .thresholds(x.ticks(d3.max(chartData)/2.5)); // Number of bins

    // Calculate the bins
    const bins = histogram(chartData);

    // Define the y-scale (counts)
    const y = d3.scaleLinear()
      .domain([0, d3.max(bins.map(l => l.length))*1.2 ]) // Count occurrences within each bin
      .range([height, 0]); // Inverted for bars to start at the bottom

    // Create the SVG group for the bars
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Define the bars
    const rect = g.selectAll("rect")
      .data(bins)
      .enter()
      .append("rect")
      .attr("x", d => x(d.x0)) // Starting x position based on bin x0
      .attr("y", d => y(d.length)) // Starting y position based on bin count (length)
      .attr("width", d => x(d.x1) - x(d.x0)) // Width of the bar based on bin difference
      .attr("height", d => height - y(d.length)) // Height of the bar based on y-scale
      .attr("fill", "steelblue") // Bar color

    // Add x-axis
    const xAxis = d3.axisBottom(x);
    g.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    // Add y-axis
    const yAxis = d3.axisLeft(y);
    g.append("g")
      .call(yAxis);

  return (
    <svg id="histogram"></svg>
  );
};

export default Histogram;