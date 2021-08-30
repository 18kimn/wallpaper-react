import * as d3 from 'd3'
import {solarized} from '../styleUtils'

const drawEllipses = () => {
  // document setup and mouse tracking
  let lastCoord = [0, 0]
  // the svg is mounted by Backgroundmap.js
  const svg = d3.select('.background')
  d3.select('body').on('mousemove', (event) => {
    const coords = d3.pointer(event)
    // only draw if there's been sufficient distance
    //  from the previous mouse tracking point
    // this spreads the circles out and helps w/ performance
    const dist =
      Math.pow(coords[0] - lastCoord[0], 2) +
      Math.pow(coords[1] - lastCoord[1], 2)
    if (dist > 20000) drawEllipse(coords)
  })

  // --- circle drawing
  // we want the ellipses from the last render to be taken out, so that we don't
  // keep appending a new g element
  svg.select('.ellipses').remove()
  const g = svg.append('g').attr('class', 'ellipses')

  // blur that will be referenced by the circles' inline style
  svg
    .append('defs')
    .append('filter')
    .attr('id', 'blur')
    .append('feGaussianBlur')
    .attr('stdDeviation', 20)
  // counter and a color picker dependent on the counter
  // we can use this to color the circles differently
  let circleCounter = 0

  const colorPicker = (n) => {
    return d3.piecewise(d3.interpolateRgb.gamma(2.2), [
      solarized.violet,
      solarized.blue,
      solarized.cyan,
      solarized.base02,
    ])(n / 25)
  }

  const drawEllipse = (coords) => {
    // if there are too many circles, take off until we have 25,
    //  starting from the ones placed first on the DOM
    const nCircles = g.selectAll('circle').size()
    if (nCircles > 25) {
      g.selectAll('circle')
        .filter((_, i) => i < nCircles - 25)
        .remove()
    }
    g.append('circle')
      .attr('cx', coords[0])
      .attr('cy', coords[1])
      .attr('r', 80)
      .attr('filter', 'url(#blur)')
      .style('fill-opacity', 0.2)
      .style('fill', colorPicker(circleCounter))
      .transition()
      .duration(3000)
      .style('fill-opacity', 0)
      .remove()
    lastCoord = coords
    circleCounter = (circleCounter + 1) % 25
    // circlecounter should be between 0 and 25
  }
}

export default drawEllipses
