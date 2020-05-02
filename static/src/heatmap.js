import { Chart } from "frappe-charts/dist/frappe-charts.esm.js";
import dayjs from 'dayjs';

export default class HeatmapWidget {
	constructor() {
		this.refresh();
	}

	getData() {
		return nimo.call('heatmap')
	}

	refresh() {
		this.data = this.getData().then(data => {
			this.data = data
			this.setup_container();
			this.render();
		});
	}

	setup_container() {
		this.chart = nimo.createElement(`<div class="card mt-2 align-center">
				<div id="heatmap" class="flex lg:-ml-5 justify-center overflow-auto"></div>
		</div>`)

		this.chart_wrapper = this.chart.find('#heatmap')
		this.stats_wrapper = this.chart.find('#stats')
		this.chart.append('#heatmap');
	}

	render() {
		let today = dayjs();
		let lastYear = dayjs().subtract(1, 'year')
		this.chart = new Chart(this.chart_wrapper.element, {
			data: {
				dataPoints: this.data,
				start: lastYear.$d,
				end: today.$d,
			},
			axisOptions: {
				xIsSeries: true,
			},
			width: '400px',
			type: 'heatmap',
			colors: ["#eeeeee", "#bdbdbd", "#757575", "#424242", "#000000"],
			// colors: ["#eeeeee", "#E6FFFA", "#81E6D9", "#38B2AC", "#2C7A7B"]
		})
	}
}