exports.drawPieChartOrder = function(data, labels) {
	let lablesString = '';
	for (let i = 0; i < labels.length; i++) {
		lablesString += `'${labels[i]}',`;
	}
	let dataString = '';
	for (let i = 0; i < data.length; i++) {
		dataString += `${data[i]},`;
	}
    return  'if ($("#pieChart").length) {const chartHeight = 300;$("#pieChartContainer").css("height", chartHeight + "px");ctxPie = document.getElementById("pieChart").getContext("2d");optionsPie = {responsive: true,maintainAspectRatio: false,layout: {padding: {left: 10,right: 10,top: 10,bottom: 10}},legend: {position: "top"}};configPie = {type: "pie",data: {datasets: [{data: [' + dataString + '],backgroundColor: ["#F7604D", "#4ED6B8", "#A8D582", "#f5a623"],label: "Storage"}],labels: [' + lablesString +']},options: optionsPie};pieChart = new Chart(ctxPie, configPie);}';
} 