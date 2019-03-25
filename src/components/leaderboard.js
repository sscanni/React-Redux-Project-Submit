import React from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class LeaderBoard extends React.Component {

    render() {

        const trophyColor = [{color: 'rgb(197, 168, 0)'}, {color: 'rgb(0, 128, 0)'}, {color: 'rgb(160, 82, 45)'}]

        if (this.props.authedUser === null) {
            return <Redirect to='/login' />
        }
        return (
            <div className="container col-md-4 mt-3">
                {this.props.userIds.slice(0, 3).map((id, x) => (
                <div key={id}>
                    <div className="card">
                        <div className="card-body">
                            <div className="media">
                                <div className="trophy-background">
                                    <span className="trophy"><i className='fas fa-trophy' style={trophyColor[x]}></i></span>
                                </div>
                                <div className="nav-link avatar-div pl-0">
                                    <img className='ml-3 mr-3 mt-3 mb-3 rounded-circle QuestAvatar' 
                                        src={'/avatars/' + this.props.users[id].avatarURL} alt='user' />
                                </div>
                                <div className="pl-3 media-body border border-top-0 border-bottom-0 border-right-0">
                                    <h3><strong>{this.props.users[id].name}</strong></h3>
                                    <br></br>
                                    <strong>
                                        <div className="float-left">Answered questions:</div>
                                        <div className="float-right pr-5">{Object.keys(this.props.users[id].answers).length}</div><br></br><br></br>

                                        <div className="float-left">Created questions:</div>
                                        <div className="float-right pr-5">{Object.keys(this.props.users[id].questions).length}</div><br></br><br></br>
                                    </strong>
                                </div>
                                <div className="card">
                                    <div className="card-header">
                                        <p className="text-center"><strong>Score</strong></p>
                                    </div>
                                    <div className="card-body">
                                        <p className="text-center mt-3">
                                        <strong>
                                            {Object.keys(this.props.users[id].answers).length + 
                                            Object.keys(this.props.users[id].questions).length} 
                                        </strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br></br>
                </div>
                ))}
            </div>
        )
    }
}

function mapStateToProps({ questions, users, authedUser}) {

    return {
        questionIds: Object.keys(questions),
        userIds: Object.keys(users).sort((a,b) =>           
            (Object.keys(users[b].answers).length + 
            Object.keys(users[b].questions).length)
            - 
            (Object.keys(users[a].answers).length + 
            Object.keys(users[a].questions).length)),
        questions,
        users,
        authedUser
    }
}

export default connect(mapStateToProps)(LeaderBoard);