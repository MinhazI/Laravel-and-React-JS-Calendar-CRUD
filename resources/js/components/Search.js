import React from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';

import "react-datepicker/dist/react-datepicker.css";

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            holidayStartDate: new Date(),
            holidayEndDate: new Date(),
        }
    }

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-md-8 pb-4">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Search for Holiday</li>
                        </ol>
                    </nav>
                    <div className="card">
                        <div className="card-header">
                            Search for Holiday
                        </div>
                        <div className="card-body">

                            <p>You can search for data through any of the column name, not only the start or end date range. Please use the search box below.</p>

                            <MDBDataTable
                                striped
                                bordered
                                hover
                                data={
                                    {
                                        columns: [{
                                            label: 'Holiday Name',
                                            field: 'holidayName',
                                            sort: 'asc',
                                            width: 150
                                        },
                                        {
                                            label: 'Start Date',
                                            field: 'startDate',
                                            sort: 'asc',
                                            width: 270
                                        },
                                        {
                                            label: 'End Date',
                                            field: 'endDate',
                                            sort: 'asc',
                                            width: 200
                                        },
                                        {
                                            label: 'Holiday Added On',
                                            field: 'holidayAddedOn',
                                            sort: 'asc',
                                            width: 100
                                        },
                                        {
                                            label: 'Action',
                                            field: 'action',
                                            sort: 'asc',
                                            width: 150
                                        },
                                        ],
                                        rows: [
                                            {
                                                holidayName: 'National Independance Day',
                                                startDate: '2020/02/04',
                                                endDate: '2020/02/04',
                                                holidayAddedOn: 'Monday, Oct 21st 2019',
                                                action: '',
                                            },
                                            {
                                                holidayName: 'Holiday 2',
                                                startDate: '2019/10/23',
                                                endDate: '2019/10/25',
                                                holidayAddedOn: 'Tuesday, Oct 22nd 2019',
                                                action: '',
                                            },
                                            {
                                                holidayName: 'Holiday Three',
                                                startDate: '2019/10/30',
                                                endDate: '2019/11/02',
                                                holidayAddedOn: 'Wednesday, Oct 23rd 2019',
                                                action: '',
                                            },
                                            {
                                                holidayName: 'Holiday Four',
                                                startDate: '2019/11/26',
                                                endDate: '2019/11/26',
                                                holidayAddedOn: 'Wednesday, Oct 23rd 2019',
                                                action: '',
                                            },
                                            {
                                                holidayName: 'Holiday Five',
                                                startDate: '2019/12/10',
                                                endDate: '2019/12/11',
                                                holidayAddedOn: 'Monday, Oct 20th 2019',
                                                action: '',
                                            },
                                            {
                                                holidayName: 'Christmas Eve',
                                                startDate: '2019/12/24',
                                                endDate: '2019/12/24',
                                                holidayAddedOn: 'Tuesday, Oct 22nd 2019',
                                                action: '',
                                            },
                                            {
                                                holidayName: 'Christmas',
                                                startDate: '2019/12/25',
                                                endDate: '2019/12/27',
                                                holidayAddedOn: 'Wednesday, Oct 23rd 2019',
                                                action: '',
                                            },
                                            {
                                                holidayName: 'Holiday Six',
                                                startDate: '2019/12/26',
                                                endDate: '2019/12/226',
                                                holidayAddedOn: 'Wednesday, Oct 23rd 2019',
                                                action: '',
                                            },
                                            {
                                                holidayName: 'New Year\'s eve',
                                                startDate: '2019/12/30',
                                                endDate: '2019/12/30',
                                                holidayAddedOn: 'Wednesday, Oct 23rd 2019',
                                                action: '',
                                            },
                                            {
                                                holidayName: 'New Years',
                                                startDate: '2019/12/31',
                                                endDate: '2020/01/01',
                                                holidayAddedOn: 'Wednesday, Oct 23rd 2019',
                                                action: '',
                                            },
                                            {
                                                holidayName: 'First Holiday',
                                                startDate: '2020/01/31',
                                                endDate: '2020/02/01',
                                                holidayAddedOn: 'Wednesday, Jan 12rd 2012',
                                                action: '',
                                            },
                                        ]
                                    }}
                            />
                        </div>
                    </div>
                </div>
            </div>


        )
    };
}
