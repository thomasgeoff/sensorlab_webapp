setActivePage('nav_home');
document.getElementById('stats-generator').click();

if(document.querySelector('.jscolor').value == '000000'){
	document.getElementById('off-button').classList.add('disabled');
	document.getElementById('set-default-button').classList.add('disabled');
}else {
	document.getElementById('off-button').classList.remove('disabled');
	document.getElementById('set-default-button').classList.remove('disabled');
}
function submit(setDefault=false, useDefault=false, turnOff=false){
	if(setDefault){
		document.getElementById('set-as-default').checked = true;
	}
	if(useDefault){
		document.getElementById('change-to-default').checked = true;
	}
	if(turnOff){
		document.getElementById('turn-off').checked = true;
	}
	document.getElementById('color-form').submit();
}

/*
var data = {
    datasets: [{
        data: [10, 20, 30],
        backgroundColor: ['Red', 'Yellow', 'Blue']
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        'Red',
        'Yellow',
        'Blue'
    ]
};
var ctx = document.getElementById('temperature-chart');
var myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: {
    	legend: {
    		display: false,
    	}
    }
});
w */
function analyse(temperatureData, humidityData, onData) {
	var temperatureRenderData = {
		datasets: [{
			data: temperatureData,
			backgroundColor: ['Red', 'Yellow', 'Blue']
		}],
	
		labels: ['High','Normal','Low']
	};
	var humidityRenderData = {
		datasets: [{
			data: humidityData,
			backgroundColor: ['Red', 'Yellow', 'Blue']
		}],
	
		labels: ['High','Comfortable','Low']
	};
	var onRenderData = {
		datasets: [{
			data: onData,
			backgroundColor: ['Red', 'Yellow']
		}],
	
		labels: ['On','Off']
	};

	renderChart(document.getElementById('temperature-chart'), temperatureRenderData)
	renderChart(document.getElementById('humidity-chart'), humidityRenderData)
	renderChart(document.getElementById('on-chart'), onRenderData)
}
function renderChart(ctx, data){
//var onCtx = document.getElementById('on-chart');
var myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: {
    	legend: {
    		display: false,
    	}
    }
  });
}