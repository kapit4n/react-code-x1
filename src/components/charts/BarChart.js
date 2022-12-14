import React from 'react'
import * as d3 from 'd3'

class BarChart extends React.PureComponent {

    constructor(props) {
        super(props)
        this.chartRef = React.createRef()
        this.secondChartRef = React.createRef()
        this.labelsRef = React.createRef()
        this.dataset = [{ value: 500, label: 'RED', color: 'red' }, { value: 300, label: 'YELLOW', color: 'yellow' }, { value: 100, label: 'GREEN', color: 'green' }]
    }

    buildFirstChart() {
        let size = 500
        const container = d3.select(this.chartRef.current)

        let svg = container
            .append('svg')
            .attr('width', size)
            .attr('height', size)

        let labels = container
            .append('div')
            .attr('width', size)
            .attr('height', 20)
            .style("display", 'flex')

        let rect_width = 95

        svg.selectAll('rect')
            .data(this.dataset)
            .enter()
            .append('rect')
            .attr('x', (d, i) => 5 + i * (rect_width + 5))
            .attr('y', d => size - d.value)
            .attr('width', rect_width)
            .attr('height', d => d.value)
            .attr('fill', d => d.color)
            .on("mouseover", function (d) {
                d3.select(this)
                    .transition()
                    .duration(100)
                    .style("opacity", 0.5);
            })
            .on("mouseout", function (d) {
                d3.select(this)
                    .transition()
                    .duration(100)
                    .style("opacity", 1);
            });

        labels.selectAll('p')
            .data(this.dataset)
            .enter()
            .append("p").text((p) => p.label)
            .style('width', `${rect_width + 5}px`)
            .on('mouseover', function (d, i) {
                d3.select(this)
                    .transition()
                    .duration(100)
                    .style("opacity", 0.5);

            })
            .on('mouseout', function (d, i) {
                d3.select(this)
                    .transition()
                    .duration(100)
                    .style("opacity", 1);

            })
    }

    buildSecondChart() {
        let size = 500
        const container = d3.select(this.chartRef.current)
        let rect_width = 100

        let svg = container
            .append('svg')
            .attr('width', size)
            .attr('height', size)
        svg.selectAll('rect')
            .data(this.dataset)
            .enter()
            .append('rect')
            .attr('x', (d, i) => 5 + i * (rect_width + 5))
            .attr('y', d => size - d.value)
            .attr('width', rect_width)
            .attr('height', d => d.value - 50)
            .attr('fill', d => d.color)
            .on("mouseover", function (d) {
                d3.select(this)
                    .transition()
                    .duration(100)
                    .style("opacity", 0.5);
            })
            .on("mouseout", function (d) {
                d3.select(this)
                    .transition()
                    .duration(100)
                    .style("opacity", 1);
            });

        var texts = svg.selectAll(".myTexts")
            .data(this.dataset)
            .enter()
            .append("text");

        texts.attr('x', (d, i) => 5 + i * (rect_width + 5))
            .attr('y', d => size)
            .text(function (d) { return d.label });

    }

    componentDidMount() {
       // this.buildFirstChart()
        this.buildSecondChart()
    }

    render() {
        return (
            <>
                <div ref={this.chartRef}>
                </div>

                <div ref={this.secondChartRef}>
                </div>

            </>
        )
    }
}

export default BarChart