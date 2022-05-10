export function addHeader(root, x, y, content) {
    return root.append('text')
        .attr('text-anchor', 'start')
        .attr('x', x)
        .attr('y', y)
        .selectAll('tspan')
        .data(content.split('\n'))
        .join('tspan')
        .classed('mz-chart__header', true)
        .attr('x', x)
        .attr('dy', (d, i) => `${i ? 1.2 : 0}em`)
        .text(d => d);
}
