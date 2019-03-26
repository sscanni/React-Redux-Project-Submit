import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

class Login extends React.Component {

    state = {
        userid: '',
    }

    itemSelect = (e, id) => {
        e.preventDefault()
        document.getElementById("selButton").innerHTML = this.props.users[id].name;
        const userid = id

        this.setState(() => ({
            userid
        }))
    }

    subItem = (e) => {
        console.log("this.props.location.state.referrer=", this.props.location.state.referrer)
        e.preventDefault()
        const { userid } = this.state
        if (userid) {
            this.props.dispatch(setAuthedUser(userid))
        }
        this.props.history.push(this.props.location.state.referrer)
    }

    componentDidMount() {
        const aUser = null
        const { dispatch } = this.props
        dispatch(setAuthedUser(aUser))
    }
    render() {

        return (
            <div className="container col-md-4 mt-3">
                <div className="card-body">
                    <div className="card">
                        <div className="card-header text-center">
                            <h4>Welcome to the Would You Rather App</h4>
                            <p>Please sign in to continue</p>
                        </div>
                        <div className="card-body">
                            <img src="logo.jpg" alt="logo" className="mx-auto d-block"></img>
                            <h3 className="text-center">Sign in</h3>
                            <br></br>
                            <div className="dropdown">
                                <button id="selButton" className="text-left btn btn-outline-secondary btn-block dropdown-toggle" type="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Select User
                                </button>
                                <div className="dropdown-menu w-100" aria-labelledby="dropdownMenuButton">
                                    <div className="card-body">
                                        {this.props.userIds.map((id, x) => (
                                            <div key={id}>
                                                <div className="media">
                                                    <Link to="" onClick={(e) => this.itemSelect(e, id)}>
                                                        <img src={'/avatars/' + this.props.users[id].avatarURL} alt='user' className='rounded-circle navtar' />
                                                        <span> {this.props.users[id].name}</span>
                                                    </Link>
                                                </div>
                                                {x < this.props.userIds.length - 1 && (<br></br>)}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <Link to="" onClick={(e) => this.subItem(e)}>
                        <button id="subButton" className="btn btn-outline-primary btn-sm btn-block">Submit</button>
                    </Link>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    return {
        userIds: Object.keys(users),
        users,
    }
}

export default connect(mapStateToProps)(Login);