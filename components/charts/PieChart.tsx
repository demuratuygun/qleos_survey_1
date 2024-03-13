'use client'

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PieChart = ({ data, width, height }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeSet3);
    const pie = d3.pie().value(d => d.value);
    const data_ready = pie(data);


    svg.selectAll('slices')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(Math.min(width, height) / 2 - 1)
      )
      .attr('fill', d => color(d.data.key))
      .attr('stroke', 'black')
      .style('stroke-width', '2px');

  }, [data, width, height]);

  return (
    <div className={'w-full p-8 flex items-center justify-center '}>
        <svg ref={ref}></svg>
    </div>);
};

export default PieChart;
