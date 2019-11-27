import React from 'react';
import axios from 'axios';
import swal from '@sweetalert/with-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Link } from 'react-router-dom';

import "react-datepicker/dist/react-datepicker.css";

export default class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.onHolidayNameChange = this.onHolidayNameChange.bind(this);
        this.onHolidayStartDateChange = this.onHolidayStartDateChange.bind(this);
        this.onHolidayEndDateChange = this.onHolidayEndDateChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            holidayName: '',
            holidayStartDate: '',
            holidayEndDate: '',
        }

    }

    componentDidMount() {
        console.log('ID: ' + this.props.match.params.id);
        axios.get('http://127.0.0.1:8000/holiday/getHoliday/' + this.props.match.params.id)
            .then(response => {
                console.log(response);
                this.setState({
                    holidayName: response.data.name,
                    holidayStartDate: moment(response.data.start_date, moment.defaultFormat).toDate(),
                    holidayEndDate: moment(response.data.end_date, moment.defaultFormat).toDate()
                })

            })
            .catch(function (error) {
                console.log("Error: " + error);
            })

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

        axios.put('http://127.0.0.1:8000/holiday/update/' + this.props.match.params.id, holiday)
            .then(function (response) {
                swal({
                    text: "Success!",
                    icon: "success",
                    buttons: {
                        cancel: "Close",
                    },
                    content: (
                        <div>
                            <p>Successfully updated the record! Please refresh the home page to see it.</p>
                        </div>
                    )
                });
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
                            <p>The attempt to update the holiday wasn't successful. Please try again!</p>
                        </div>
                    )
                });
            });
    }



    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-md-8 pb-4">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Edit Holiday</li>
                        </ol>
                    </nav>
                    <div className="card">
                        <div className="card-header">
                            Edit Holiday
                        </div>
                        <div className="card-body">

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
                                    <div className="col-md-6 mb-12 mt-3 mb-4 col-6">
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
                                    <div className="col-md-6 mb-12 mb-3 mt-3 col-6">
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

                                    <button className="btn btn-warning mr-3" type="submit">Edit holiday</button>
                                    <Link to="/" className="btn btn-secondary" data-dismiss="modal">Go Back</Link>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        )
    };
}
