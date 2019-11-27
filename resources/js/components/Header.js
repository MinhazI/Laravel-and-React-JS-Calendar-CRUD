import React from 'react';

export default class Header extends React.Component{
    render() {
        return (
            <div className="container" align="center">
                <div className="col-md-8 pt-5 pb-5">
                    <h2>Welcome to the <span className="font-weight-bold">Holiday Managament App</span></h2>
                </div>
            </div>
        )
    };
}
