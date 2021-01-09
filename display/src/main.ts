import * as d3 from "d3";
import * as AWS from "aws-sdk";

const urlParams = new URLSearchParams(window.location.search);

const dbclient = new AWS.DynamoDB({
    credentials: new AWS.Credentials(urlParams.get('access'), urlParams.get('secret')),
    region: 'eu-west-1',
});

(async () => {

    const DAY_IN_MS = 24 * 60 * 60 * 1000;
    const MIN_X = 0;

    const results = await new Promise((resolve, reject) => {
        dbclient.query({
            ExpressionAttributeValues: {
                ":sensor": {
                    S: "41223"
                },
                ":time": {
                    N: `${new Date().getTime() - DAY_IN_MS}`
                }
            },
            ExpressionAttributeNames: {
                "#time": 'time'
            },
            KeyConditionExpression: "sensorId = :sensor AND #time > :time",
            // FilterExpression: "#time > :time",
            TableName: "ember"
        }, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data.Items);
        });
    });

    const weather = await new Promise((resolve, reject) => {
        dbclient.query({
            ExpressionAttributeValues: {
                ":id": {
                    S: '2644849'
                },
                ":time": {
                    N: `${Math.floor((new Date().getTime() - DAY_IN_MS) / 1000)}`
                }
            },
            KeyConditionExpression: "id = :id AND dt > :time",
            TableName: "weather"
        }, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data.Items);
        });
    });

    const results2 = await new Promise((resolve, reject) => {
        dbclient.query({
            ExpressionAttributeValues: {
                ":sensor": {
                    S: "41224"
                },
                ":time": {
                    N: `${new Date().getTime() - DAY_IN_MS}`
                }
            },
            ExpressionAttributeNames: {
                "#time": 'time'
            },
            KeyConditionExpression: "sensorId = :sensor AND #time > :time",
            // FilterExpression: "#time > :time",
            TableName: "ember"
        }, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data.Items);
        });
    });

    const results3 = await new Promise((resolve, reject) => {
        dbclient.query({
            ExpressionAttributeValues: {
                ":sensor": {
                    S: "41225"
                },
                ":time": {
                    N: `${new Date().getTime() - DAY_IN_MS}`
                }
            },
            ExpressionAttributeNames: {
                "#time": 'time'
            },
            KeyConditionExpression: "sensorId = :sensor AND #time > :time",
            // FilterExpression: "#time > :time",
            TableName: "ember"
        }, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data.Items);
        });
    });

    function drawGraph(container, results, weather, minY = MIN_X) {
        // set the dimensions and margins of the graph
        var margin = {top: 40, right: 30, bottom: 30, left: 60},
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg = d3.select(container)
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        svg.append("text")
            .attr('font-family', 'sans-serif')
            .attr('font-weight', 'bold')
            .attr('font-size', '24px')
            .attr('fill', '#58546a')
            .attr('y', -10) // TODO: setting
            .text(results[0].name.S);


        const data = (<Array<any>>results)
            .map(d => ({
                date : d3.timeParse("%Q")(d.time.N),
                value: Number(d.temperature.N),
                status: d.status ? Number(d.status.N) : -1
            }));

        let weatherData = [];
        if (weather) {
            weatherData = weather.map(d => ({
                date: d3.timeParse("%s")(d.dt.N),
                value: Number(d.main.M.temp.N) -273.15, // Kelvin to C
            }));
        }

        const aggregatedData = [];
        const rollupAmount = 15 * 60 * 1000; // 15 mins
        d3.rollup(data, v => d3.mean(v, (d: any) => d.value), (d: any) => Math.floor(d.date / rollupAmount) * rollupAmount )
            .forEach((val, key) => {
                aggregatedData.push({ value: val, date: key });
            })


        // Add X axis --> it is a date format
        var x = d3.scaleTime()
        .domain(d3.extent(aggregatedData, function(d) { return d.date; }))
        .range([ 0, width ]);
        const axisX = svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scaleLinear()
        .domain([minY, d3.max(aggregatedData, function(d) { return +d.value; })])
        .range([ height, 0 ]);
        
        const axisY = svg.append("g")
        .call(d3.axisLeft(y));

        axisY.selectAll("line")
            .style("stroke", "#aab8c9"); // e1e3eb
        axisY.selectAll("path")
            .style("stroke", "#aab8c9"); // e1e3eb
        axisY.selectAll("text")
            .style("fill", "#aab8c9"); // e1e3eb
        axisX.selectAll("line")
            .style("stroke", "#aab8c9"); // e1e3eb
        axisX.selectAll("path")
            .style("stroke", "#aab8c9"); // e1e3eb
        axisX.selectAll("text")
            .style("fill", "#aab8c9"); // e1e3eb

        const line = d3.line() 
            .x((d: any) => x(d.date))
            .y((d: any) => y(d.value))
            .curve(d3.curveBasis);
        
        const line2 = d3.line() 
            .x((d: any) => x(d.date))
            .y((d: any) => y(d.value))
            .curve(d3.curveBasis);

        /*
        const weatherLine = d3.line() 
            .x((d: any) => x(d.date))
            .y((d: any) => y(d.value))
            .curve(d3.curveBasis);
        */

        // Background to show whether it's on or off
        let statusData = [];
        for (let i = 0; i < data.length; i++) {
            const d = data[i];
            if (d.status === -1) {
                continue;
            }
            if (statusData.length === 0 || d.status !== statusData[statusData.length - 1].value) {
                statusData.push({ startTime: d.date, endTime: d.date, value: d.status });
            } else {
                statusData[statusData.length - 1].endTime = d.date;
            }
        }
        statusData = statusData.filter(s => s.value !== 1);

        svg
            .selectAll("rect")
            .data(statusData)
            .enter().append("rect")
            .attr("width", function(d: any) { return x(d.endTime) - x(d.startTime) }) // TODO: should make this go to whenever the next one is instead
            .attr("height", height)
            .attr("opacity", function(d: any) { return d.value === 1 ? 0 : 0.15 })
            .attr("fill", '#ff3456')
            .attr("x", function(d: any) { return x(d.startTime) })
            .attr("y", 0);

        if (weatherData) {
            svg.append("path")
                // .datum(data)
                .datum(weatherData)
                .attr("fill", "none")
                .attr("stroke", "#aab8c9")
                .attr("stroke-width", 3)
                .attr("d", <any>line2);
        }
        
        // Add the line
        svg.append("path")
            // .datum(data)
            .datum(aggregatedData)
            .attr("fill", "none")
            .attr("stroke", "#0066ff")
            .attr("stroke-width", 3)
            .attr("d", <any>line);
    }

    drawGraph("#my_dataviz", results, null, 20);
    drawGraph("#my_dataviz2", results2, weather);
    drawGraph("#my_dataviz3", results3, weather);
})();