import React from "react";
import Chart from "chart.js/auto";
import axios from "axios";

class ChartBox extends React.Component {
  state = {
    dates: [],
    values: [],
    filter: {
      startDate: "",
      endDate: "",
      currency: "",
    },
    chart: null,
  };

  componentDidMount = async () => {
    try {
      await this.getData();

      this.renderChart();
    } catch (err) {
      console.error(err);
    }
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (
      prevState.filter.startDate !== this.state.filter.startDate ||
      prevState.filter.endDate !== this.state.filter.endDate ||
      prevState.filter.currency !== this.state.filter.currency
    ) {
      try {
        await this.getData();

        this.renderChart();
      } catch (err) {
        console.error(err);
      }
    }
  };

  getData = async () => {
    const dateString =
      this.state.filter.startDate && this.state.filter.endDate
        ? `start=${this.state.filter.startDate}&end=${this.state.filter.endDate}`
        : "";

    const fullFilterString = this.state.filter.currency
      ? `${dateString}&currency=${this.state.filter.currency}`
      : "";

    const response = await axios.get(
      `https://api.coindesk.com/v1/bpi/historical/close.json?${fullFilterString}`
    );

    console.log(response);

    this.setState({
      dates: Object.keys(response.data.bpi),
      values: Object.values(response.data.bpi),
    });
  };

  renderChart = () => {
    if (this.state.chart) {
      this.state.chart.destroy();
    }
    const ctx = document.getElementById("chart").getContext("2d");
    const chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: this.state.dates,
        datasets: [
          {
            label: "Bitcoin Price",
            data: this.state.values,
            borderColor: ["#2258d6"],
            backgroundColor: ["#2258d6"],
            borderWidth: 3,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    this.setState({ chart: chartInstance });
  };

  handleChange = (event) => {
    const clone = { ...this.state };

    clone.filter = { ...clone.filter, [event.target.name]: event.target.value };

    this.setState({ ...clone });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <div className="form-group">
          <label>Starting date</label>
          <input
            type="date"
            className="form-control"
            name="startDate"
            onChange={this.handleChange}
            value={this.state.filter.startDate}
          />
        </div>

        <div className="form-group">
          <label>Ending date</label>
          <input
            type="date"
            className="form-control"
            name="endDate"
            onChange={this.handleChange}
            value={this.state.filter.endDate}
          />
        </div>

        <div className="form-group">
          <label>Currency</label>
          <select
            class="form-control"
            name="currency"
            onChange={this.handleChange}
            value={this.state.filter.currency}
          >
            <option value="USD">Dollar</option>
            <option value="EUR">Euro</option>
            <option value="BRL">Brazillian Real</option>
          </select>
        </div>
        <div className="d-flex flex-column">
          <strong>Max. Value </strong>
          <span>{Math.max(...this.state.values)}</span>
        </div>

        <div className="d-flex flex-column">
          <strong>Min. Value</strong>
          <span>{Math.min(...this.state.values)}</span>
        </div>

        <canvas id="chart" width="200"></canvas>
      </div>
    );
  }
}

export default ChartBox;