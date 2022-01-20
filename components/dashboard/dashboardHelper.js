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

exports.drawBarChartRevenueMonth = function(data) {
	const labelsString = data.map(item => `'Tháng ${item.month}'`).join(',');
	const dataString = data.map(item => item.totalRevenue).join(',');
	return 'if ($("#barChart").length) {ctxBar = document.getElementById("barChart").getContext("2d");optionsBar = {responsive: true,scales: {yAxes: [{barPercentage: 0.2,ticks: {beginAtZero: true},scaleLabel: {display: true,labelString: "Doanh thu theo từng tháng"}}]}};optionsBar.maintainAspectRatio =$(window).width() < 480 ? false : true;configBar = {type: "horizontalBar",data: {labels: [' + labelsString + '],datasets: [{label: "Doanh thu",data: [' + dataString + '],backgroundColor: ["#F7604D","#4ED6B8","#A8D582","#D7D768","#9D66CC","#DB9C3F","#3889FC","#F7604D","#4ED6B8","#A8D582","#D7D768","#9D66CC",],borderWidth: 0}]},options: optionsBar};barChart = new Chart(ctxBar, configBar);}';
}

exports.drawLineChartQtyMonth = function(data) {
	const colors = ['#F7604D', '#4ED6B8', '#A8D582', '#D7D768', '#9D66CC', '#DB9C3F', '#3889FC'];

	const datasetString = data.map((item,index) => {
		return `{label: '${item.category_name}',data: [${item.quantityList}],borderColor: "${colors[index]}",fill: false}`
	}).join(',');
	return 'const randomColor = () => {return "#" + (Math.random() * 0xFFFFFF << 0).toString(16);};const width_threshold = 480;if ($("#lineChart").length) {ctxLine = document.getElementById("lineChart").getContext("2d");optionsLine = {scales: {yAxes: [{scaleLabel: {display: true,labelString: "Số lượng đã bán theo từng tháng"}}]}};optionsLine.maintainAspectRatio = $(window).width() < width_threshold ? false : true;configLine = {type: "line",data: {labels: ["Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12",],datasets: ['+ datasetString + ']},options: optionsLine};lineChart = new Chart(ctxLine, configLine);}';
}