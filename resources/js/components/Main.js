import React from 'react';
import axios from 'axios';
import swal from '@sweetalert/with-react';
import moment from 'moment';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import EditHoliday from './Edit'
import Home from './Index';
import DatePicker from 'react-datepicker';


export default class Main extends React.Component {
    constructor() {
        super();

        this.onHolidayNameChange = this.onHolidayNameChange.bind(this);
        this.onHolidayStartDateChange = this.onHolidayStartDateChange.bind(this);
        this.onHolidayEndDateChange = this.onHolidayEndDateChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            holidaysList: [],
            holidayName: '',
            holidayStartDate: new Date(),
            holidayEndDate: new Date(),
            date: ''
        }
    }

    onHolidayNameChange(e) {
        this.setState({
            holidayName: e.target.value
        })
    }

    onHolidayStartDateChange(e) {
        console.log("Date Start: " + moment(e).format('YYYY/MM/DD'));
        this.setState({
            holidayStartDate: e
        })
    }

    onHolidayEndDateChange(e) {
        console.log("Date End: " + e.toLocaleDateString());
        this.setState({
            holidayEndDate: e
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const holiday = {
            holidayName: this.state.holidayName,
            holidayStartDate: moment(this.state.holidayStartDate).format('YYYY/MM/DD'),
            holidayEndDate: moment(this.state.holidayEndDate).format('YYYY/MM/DD'),
        }

        console.log(holiday);

        axios.post('http://127.0.0.1:8000/holiday/add', holiday)
            .then(function (response) {
                swal({
                    text: "Success!",
                    icon: "success",
                    buttons: {
                        cancel: "Close",
                    },
                    content: (
                        <div>
                            <p>Successfully added the holiday! Please refresh the page to see it.</p>
                        </div>
                    )
                });
                console.log("Success");
            })
            .catch(function (error) {
                swal({
                    text: "Error!",
                    icon: "error",
                    buttons: {
                        cancel: "Close",
                    },
                    content: (
                        <div>
                            <p>The attempt to add the holiday wasn't successful. Please try again!</p>
                        </div>
                    )
                });

                console.log("Error");
            });
    }


    onDelete(holidayID) {
        axios.delete('http://127.0.0.1:8000/holiday/delete/' + holidayID)
            .then(function (response) {

                swal({
                    text: "Success!",
                    icon: "success",
                    buttons: {
                        cancel: "Close",
                    },
                    content: (
                        <div>
                            <p>Successfully deleted the holiday! Please refresh the page to the changes.</p>
                        </div>
                    )
                })

            })
            .catch(function (error) {
                swal({
                    text: "Error!",
                    icon: "error",
                    buttons: {
                        cancel: "Close",
                    },
                    content: (
                        <div>
                            <p>The attempt to delete the holiday wasn't successful. Please try again!</p>
                        </div>
                    )
                })
            })
            .finally(function () {
                // always executed
            });
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/holiday/').then(response => this.setState({ holidaysList: response.data }));

    }

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-md-8 pb-4">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item active" aria-current="page">Home</li>
                        </ol>
                    </nav>
                    <div className="card">
                        <div className="card-header">
                            <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Add New Holiday</button>
                            <h4 className="card-title mt-2 text-center ml-5 mr-5" style={{ display: 'inline-block' }}>Listing all holidays</h4>
                            <Link to={`/holiday/search`} className="btn btn-success float-right mt-2 mr-3">Search</Link>
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
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add new holiday</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <div className="row">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                            <li className="breadcrumb-item active" aria-current="page">Add New Holiday</li>
                                        </ol>
                                    </nav>
                                </div>

                            </div>
                            <div className="modal-body">
                                <form className="needs-validation" noValidate onSubmit={this.onSubmit}>
                                    <div className="form-row">
                                        <div className="col-md-12 mb-12">
                                            <label htmlFor="holidayName">Holiday Name</label>
                                            <input type="text" className="form-control" id="holidayName" onChange={this.onHolidayNameChange} value={this.state.holidayName} placeholder="Holiday Name" required />
                                            <div className="valid-feedback">
                                                Looks good!
                                    </div>
                                            <div className="invalid-feedback">
                                                Please choose a holiday name.
                                        </div>
                                        </div>
                                        <div className="col-md-6 mb-12 mt-3 mb-3 col-6">
                                            <label htmlFor="holidayStartDate">Holiday Start Date</label>

                                            <div className="input-group">
                                                <DatePicker className="form-control" id="holidayStartDate" selected={this.state.holidayStartDate} onChange={date => this.onHolidayStartDateChange(date)} dateFormat="yyyy/MM/dd" minDate={new Date()} required />

                                                <div className="valid-feedback">
                                                    Looks good!
                                            </div>
                                                <div className="invalid-feedback">
                                                    Please choose a valid date.
                                            </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-12 mb-3 col-6 mt-3">
                                            <label htmlFor="holidayEndDate">Holiday End Date</label>
                                            <div className="input-group">
                                                <DatePicker className="form-control" id="holidayEndDate" selected={this.state.holidayEndDate} onChange={date => this.onHolidayEndDateChange(date)} dateFormat="yyyy/MM/dd" minDate={this.state.holidayStartDate} required />
                                                <div className="invalid-feedback">
                                                    Please choose a valid date.
                                            </div>
                                                <div className="valid-feedback">
                                                    Looks good!
                                            </div>

                                            </div>
                                        </div>

                                        <button className="btn btn-primary mr-3" type="submit">Add new holiday</button>
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}
