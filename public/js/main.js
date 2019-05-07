const socket = io()
let data = [];
let draw = [];
let chart = Morris.Line({
    element: 'line-example',
    data,
    xkey: 'y',
    ykeys: ['a'],
    labels: ['Time'],
    parseTime: false,
    pointFillColors: ['#ffffff'],
    pointStrokeColors: ['gray'],
    lineColors: ['red']
});

socket.on('pulse-data', (content) => {
    let template = "<tr><td>" + content.sensorData + "</td>" +
        "<td>" + content.time + "</td> </tr> "
    // data.push(content);
    draw.push({
        y: content.time,
        a: content.sensorData
    })
    if(draw.length > 100){
        draw.splice(0,1);
    }
    // $('.table-body').append(template);
    setTimeout(() => {
        chart.setData(draw);
      }, 100)
});
