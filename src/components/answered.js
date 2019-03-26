import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Home extends React.Component {
    render() {
        if (this.props.authedUser === null) {
            return <Redirect
                    to={{
                    pathname: "/login",
                    state: { referrer: "/answered" }
                    }}
                />
        }
        return (
            <div>
                <div className="container col-md-4 mt-3">
                    <div className="card">
                        <div className="card-header">
                            <ul className="nav nav-tabs nav-fill card-header-tabs">
                                <li className="nav-item">
                                    <div className="nav-link">
                                        <Link to='/'>Unanswered Questions</Link>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <div className="nav-link active">
                                        <span>Answered Questions</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body">
                            {((Object.keys(this.props.users[this.props.authedUser].answers).length > 0) 
                            ? <div>
                                {this.props.questionIds.map((id) => (
                                    <div key={id}>
                                        {(
                                        this.props.questions[id].optionOne.votes.findIndex(vote => vote === this.props.authedUser) > -1 ||
                                        this.props.questions[id].optionTwo.votes.findIndex(vote => vote === this.props.authedUser) > -1) && (
                                            <div>
                                                <div className="card">
                                                    <h5 className="card-header">{this.props.users[this.props.questions[id].author].name} asks:</h5>
                                                    <div className="card-body">
                                                        <div className="media">
                                                            <div className="nav-link avatar-div pl-0">
                                                                <img className='ml-3 mr-3 mt-3 mb-3 rounded-circle QuestAvatar' 
                                                                    src={'/avatars/' + this.props.users[this.props.questions[id].author].avatarURL} alt='user' />
                                                            </div>
                                                            <div className="pl-3 media-body border border-top-0 border-bottom-0 border-right-0">
                                                                <h5>Would you rather</h5>
                                                                <p>...{this.props.questions[id].optionOne.text} ...</p>
                                                                <Link to={`/results/${id}`}> 
                                                                    <button className="btn btn-outline-primary btn-sm btn-block">View Poll</button>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br></br>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                </div>
                            :   <h4>No Answered Questions</h4>                                
                            )}
                        </div>
                    </div>
                </div>
                <br></br>
            </div>
        )
    }
}

function mapStateToProps({ questions, users, authedUser }) {
    return {
        questionIds: Object.keys(questions)
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp),        
        userIds: Object.keys(users),
        questions,
        users,
        authedUser
    }
}

export default connect(mapStateToProps)(Home);