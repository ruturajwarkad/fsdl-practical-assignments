const svg = d3.select("#lineChart"),
margin = {top:40,right:80,bottom:60,left:60},
width = +svg.attr("width") - margin.left - margin.right,
height = +svg.attr("height") - margin.top - margin.bottom;

const g = svg.append("g")
.attr("transform",`translate(${margin.left},${margin.top})`);

const x = d3.scalePoint().range([0,width]);
const y = d3.scaleLinear().range([height,0]);

const xAxisGroup = g.append("g")
.attr("transform",`translate(0,${height})`);

const yAxisGroup = g.append("g");

const tempLine = d3.line()
.x(d=>x(d.day))
.y(d=>y(d.temp));

const humidityLine = d3.line()
.x(d=>x(d.day))
.y(d=>y(d.humidity));

const rainLine = d3.line()
.x(d=>x(d.day))
.y(d=>y(d.rain));

const tempPath = g.append("path").attr("class","line temp");
const humidityPath = g.append("path").attr("class","line humidity");
const rainPath = g.append("path").attr("class","line rain");

// Legend
const legend = g.append("g").attr("transform","translate(750,20)");

const items = [
 {color:"#ff5722", text:"Temperature (°C)"},
 {color:"#2196f3", text:"Humidity (%)"},
 {color:"#4caf50", text:"Rainfall (mm)"}
];

items.forEach((item,i)=>{
    legend.append("rect")
    .attr("y",i*25)
    .attr("width",15)
    .attr("height",15)
    .attr("fill",item.color);

    legend.append("text")
    .attr("x",25)
    .attr("y",i*25+12)
    .text(item.text);
});

function updateChart(data){

    x.domain(data.map(d=>d.day));
    y.domain([0, d3.max(data, d=>Math.max(d.temp,d.humidity,d.rain)) + 10]);

    xAxisGroup.call(d3.axisBottom(x));
    yAxisGroup.call(d3.axisLeft(y));

    tempPath.datum(data).attr("d",tempLine);
    humidityPath.datum(data).attr("d",humidityLine);
    rainPath.datum(data).attr("d",rainLine);
}

async function getWeather(){

    const city = document.getElementById("cityInput").value;

    if(city === ""){
        alert("Enter city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;

    try{

        const response = await fetch(url);
        const result = await response.json();

        if(result.cod !== "200"){
            alert("City not found!");
            return;
        }

        const weatherData = result.list
.filter((item, index) => index % 8 === 0)
.slice(0,5)
.map(d => ({
    day: new Date(d.dt_txt).toLocaleDateString("en-US",{weekday:"short"}),
    temp: d.main.temp,
    humidity: d.main.humidity,
    rain: d.rain ? d.rain["3h"] || 0 : 0
}));


        updateChart(weatherData);

    }catch(error){
        console.error(error);
        alert("Error fetching data");
    }
}
