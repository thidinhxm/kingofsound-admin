/**
 * COLOR CODES
 * Red: #F7604D
 * Aqua: #4ED6B8
 * Green: #A8D582
 * Yellow: #D7D768
 * Purple: #9D66CC
 * Orange: #DB9C3F
 * Blue: #3889FC
 */
function drawPieChart() {
	if ($("#pieChart").length) {
		const chartHeight = 300;

		$("#pieChartContainer").css("height", chartHeight + "px");

		ctxPie = document.getElementById("pieChart").getContext("2d");

		optionsPie = {
			responsive: true,
			maintainAspectRatio: false,
			layout: {
				padding: {
					left: 10,
					right: 10,
					top: 10,
					bottom: 10
				}
			},
			legend: {
				position: "top"
			}
		};

		configPie = {
			type: "pie",
			data: {
				datasets: [
					{
						data: [70, 20, 10],
						backgroundColor: ["#F7604D", "#4ED6B8", "#A8D582"],
						label: "Storage"
					}
				],
				labels: [
					"Giao hàng thành công ",
					"Đang giao hàng",
					"Đẫ bị huỷ",
				]
			},
			options: optionsPie
		};

		pieChart = new Chart(ctxPie, configPie);
	}
}

 function drawLineChart() {
	const width_threshold = 480;
	if ($("#lineChart").length) {
		ctxLine = document.getElementById("lineChart").getContext("2d");
		optionsLine = {
			scales: {
				yAxes: [
					{
						scaleLabel: {
							display: true,
							labelString: "Hits"
						}
					}
				]
			}
		};

		// Set aspect ratio based on window width
		optionsLine.maintainAspectRatio =
			$(window).width() < width_threshold ? false : true;

		configLine = {
			type: "line",
			data: {
				labels: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July"
				],
				datasets: [
					{
						label: "Loa",
						data: [88, 68, 79, 57, 50, 55, 70],
						fill: false,
						borderColor: "rgb(75, 192, 192)",
						cubicInterpolationMode: "monotone",
						pointRadius: 0
					},
					{
						label: "Tai nghe",
						data: [33, 45, 37, 21, 55, 74, 69],
						fill: false,
						borderColor: "rgba(255,99,132,1)",
						cubicInterpolationMode: "monotone",
						pointRadius: 0
					},

				]
			},
			options: optionsLine
		};

		lineChart = new Chart(ctxLine, configLine);
	}
}

function drawBarChart() {
	const width_threshold = 480;
	if ($("#barChart").length) {
		ctxBar = document.getElementById("barChart").getContext("2d");

		optionsBar = {
			responsive: true,
			scales: {
				yAxes: [
					{
						barPercentage: 0.2,
						ticks: {
							beginAtZero: true
						},
						scaleLabel: {
							display: true,
							labelString: "Doanh thu theo từng tháng"
						}
					}
				]
			}
		};

		optionsBar.maintainAspectRatio =
			$(window).width() < width_threshold ? false : true;

		

		configBar = {
			type: "horizontalBar",
			data: {
				labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
				datasets: [
					{
						label: "Doanh thu",
						data: [33, 40, 28, 490, 58, 38, 44, 55, 37, 49, 58, 38],
						backgroundColor: [
							"#F7604D",
							"#4ED6B8",
							"#A8D582",
							"#D7D768",
							"#9D66CC",
							"#DB9C3F",
							"#3889FC",
							"#F7604D",
							"#4ED6B8",
							"#A8D582",
							"#D7D768",
							"#9D66CC",
						],
						borderWidth: 0
					}
				]
			},
			options: optionsBar
		};

		barChart = new Chart(ctxBar, configBar);
	}
}



function updateLineChart() {
	if (lineChart) {
		lineChart.options = optionsLine;
		lineChart.update();
	}
}

function updateBarChart() {
	if (barChart) {
		barChart.options = optionsBar;
		barChart.update();
	}
}


