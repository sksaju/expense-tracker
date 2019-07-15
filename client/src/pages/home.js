import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/authActions';

class Home extends  Component {
	render() {
        return (
            <div className="container">
                <h1> Home page </h1>
                { this.props.auth.isAuthenticated ? 
					<button
						className='btn btn-danger'
						onClick={() => this.props.logout(this.props.history)}
					>
						Logout
					</button> :
					<Link to='/login'><button className='btn btn-success'> Login </button></Link>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect( mapStateToProps, { logout } ) ( Home );