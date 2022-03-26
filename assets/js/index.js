$(function() {
    "use strict";

     // chart 1
	if(document.getElementById('chart1') !== null) {
		let url = "/api/order";

		$.get(url, function(result, status){
			let data =  JSON.parse(result)
			console.log(data)
			let totalMoney = 0;
			let newData = [];
			let newLabel = [];

			for (let i = 0; i < data.length-1; i++) {

				let today = new Date(Number(data[i].date) ).toLocaleDateString("vi-VN");
				let nextDay = new Date(Number(data[i + 1].date)).toLocaleDateString("vi-VN");
				if (today == nextDay) {
					totalMoney += Number(data[i].total) +  Number(data[i + 1].total);
				} else {
					if (totalMoney == 0) {
						totalMoney = Number(data[i+1].total);
					}
					newData.push(totalMoney);
					totalMoney = 0;
				}
				newLabel[i] = new Date(Number(data[i].date)).toLocaleDateString("vi-VN");
			}


			newLabel = newLabel.filter(function (item, pos) {
				return newLabel.indexOf(item) === pos;
			});
			let ctx = document.getElementById('chart1').getContext('2d');

			let myChart = new Chart(ctx, {
				type: 'line',
				data: {
					labels: newLabel,
					datasets: [{
						label: 'Total price',
						data: newData,
						backgroundColor: '#fff',
						borderColor: "transparent",
						pointRadius: "0",
						borderWidth: 3
					}]
				},
				options: {
					maintainAspectRatio: false,
					legend: {
						display: false,
						labels: {
							fontColor: '#ddd',
							boxWidth: 40
						}
					},
					tooltips: {
						displayColors: false
					},
					scales: {
						xAxes: [{
							ticks: {
								beginAtZero: true,
								fontColor: '#ddd'
							},
							gridLines: {
								display: true,
								color: "rgba(221, 221, 221, 0.08)"
							},
						}],
						yAxes: [{
							ticks: {
								beginAtZero: true,
								fontColor: '#ddd'
							},
							gridLines: {
								display: true,
								color: "rgba(221, 221, 221, 0.08)"
							},
						}]
					}

				}
			});
			console.log({newLabel,newData});
		});

	}
		
    // chart 2
	if(document.getElementById('chart2') !==null) {
		var ctx = document.getElementById("chart2").getContext('2d');
		var myChart = new Chart(ctx, {
			type: 'doughnut',
			data: {
				labels: ["Direct", "Affiliate", "E-mail", "Other"],
				datasets: [{
					backgroundColor: [
						"#ffffff",
						"rgba(255, 255, 255, 0.70)",
						"rgba(255, 255, 255, 0.50)",
						"rgba(255, 255, 255, 0.20)"
					],
					data: [5856, 2602, 1802, 1105],
					borderWidth: [0, 0, 0, 0]
				}]
			},
			options: {
				maintainAspectRatio: false,
				legend: {
					position: "bottom",
					display: false,
					labels: {
						fontColor: '#ddd',
						boxWidth: 15
					}
				}
				,
				tooltips: {
					displayColors: false
				}
			}
		});
	}

		
		
   });	 
   