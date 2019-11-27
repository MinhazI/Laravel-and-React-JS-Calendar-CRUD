import React from 'react';
import axios from 'axios';
import swal from '@sweetalert/with-react';
import moment from 'moment';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';



export default class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            holidaysList: [],
        }
    }

    componentDidMount() {
        console.log(this.props);
        axios.get('http://127.0.0.1:8000/holiday/search/results/').then(response => this.setState({ holidaysList: response.data }));

    }

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-md-8 pb-4">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item"><Link to="/holiday/search">Search for Holiday</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Search Result</li>
                        </ol>
                    </nav>
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title ml-5 mt-2" style={{ display: 'inline-block' }}>Search Results of Holidays</h4>
                        </div>
                        <div style={{ overflowX: 'auto' }}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Holiday Name</th>
                                        <th scope="col">Start Date</th>
                                        <th scope="col">End Date</th>
                                        <th scope="col">Holiday Added On</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.holidaysList.map(holiday => {
                                            return (
                                                <tr key={holiday.id}>
                                                    <th scope="row">{holiday.name}</th>
                                                    <td>{holiday.start_date}</td>
                                                    <td>{holiday.end_date}</td>
                                                    <td>{holiday.created_at == null ? ("Not recorded") : (moment(holiday.created_at).format("dddd[,] MMM Do YYYY"))}</td>
                                                    <td>
                                                        <Link to={`/holiday/edit/${holiday.id}`} className="btn btn-warning mr-3">Edit</Link>

                                                        <a href="#" onClick={this.onDelete.bind(this, holiday.id)} className="btn btn-danger">Delete</a>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}
