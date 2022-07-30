import * as d3 from 'd3';

export const createLineChart = async (selector: string, dataPath: string): Promise<any> => {
  // read data from csv and format variables
  const data: any = await d3.csv(dataPath);
  const parseTime: any = d3.timeParse('%s');

  data.forEach((d: any) => {
    // eslint-disable-next-line no-param-reassign
    d.date = parseTime(d.date);
    // eslint-disable-next-line no-param-reassign
    d.value = +d.value;
  });

  // set the dimensions and margins of the graph
  const margin = {
    top: 20, right: 20, bottom: 50, left: 70,
  };
  const width = 300 - margin.left - margin.right;
  const height = 200 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3.select(selector).append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // add X axis and Y axis
  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  x.domain(d3.extent(data, (d) => d.date));
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  y.domain([0, d3.max(data, (d) => d.value)]);

  svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  svg.append('g')
    .call(d3.axisLeft(y));

  // add the Line
  const valueLine = d3.line()
    .x((d: any) => x(d.date))
    .y((d: any) => y(d.value));

  svg.append('path')
    .data([data])
    .attr('class', 'line')
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 1.5)
    .attr('d', valueLine);

  return svg;
};
