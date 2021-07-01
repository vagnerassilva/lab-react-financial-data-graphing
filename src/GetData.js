import React, { Component } from "react";
import axios from "axios";


export default class GetData extends Component {
    state = {

    };



    componentDidMount = async () => {

        const response = await axios.get('http://api.coindesk.com/v1/bpi/historical/close.json');

        console.log(response);

    };



    render() {
        console.log(this.state);
        return (
            <div className="d-flex justify-content-between m-3">
                <container>
                    <div className="m-3">
                        <h1>Filters</h1>
                    </div>
                    <div className="form-group m-3">
                        <label>From:</label>
                        <input type="date" />

                        <label>To: </label>
                        <input type="date" />
                    </div>

                    <div className="form-group m-3">
                        <label>Currency</label>
                        <select className="form-control">
                            <option value="USD">Dollar</option>
                            <option value="EUR">Euro</option>
                            <option value="BRL">Brazillian Real</option>
                        </select>
                    </div>

                </container>

                <container>
                    <div className="m-3">
                        <h1>Values</h1>
                    </div>
                    <div>

                    </div>

                </container>

                <canvas id="chart" width="200"></canvas>
            </div>
        );
    }
}
