import React from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Results extends React.Component {

    render() {
        if (this.props.authedUser === null) {
            return <Redirect to='/login' />
        }
        const { id } = this.props

        if (!(id in this.props.questions)) {
            return (
                <div className="container col-md-2 mt-3">
                    <h3>Question not found</h3>
                </div>   
            )
        }

        const total = this.props.questions[id].optionOne.votes.length + this.props.questions[id].optionTwo.votes.length

        const opOneVotes = this.props.questions[id].optionOne.votes.length
        const opTwoVotes = this.props.questions[id].optionTwo.votes.length

        const opOnePercent = (opOneVotes / total).toFixed(2) * 100
        const opTwoPercent = (opTwoVotes / total).toFixed(2) * 100

        let opOneDispPerc = ""
        let opTwoDispPerc = ""

        if (opOnePercent > 0 || opTwoPercent > 0) {
            opOneDispPerc = opOnePercent.toFixed(0) + "%"
            opTwoDispPerc = opTwoPercent.toFixed(0) + "%"
        }

        let opOneColor = "white"
        if (opOnePercent === 0) {
            opOneColor = "black"
        }
        let opTwoColor = "white"
        if (opTwoPercent === 0) {
            opTwoColor = "black"
        }
        
        const opOneStyle = 
            {width: opOnePercent + "%"
            ,color: opOneColor}
        const opTwoStyle = 
            {width: opTwoPercent + "%"
            ,color: opTwoColor}
    
        return (
            <div className="container col-md-4 mt-3">
                <div className="card-body">
                    <div className="card">
                        <h5 className="card-header">Asked by {this.props.users[this.props.questions[id].author].name}</h5>
                        <div className="card-body">
                            <div className="media">
                                <img className='ml-2 mr-4 mt-3 mb-3 rounded-circle ResultAvatar' 
                                    src={'/avatars/' + this.props.users[this.props.questions[id].author].avatarURL} alt='user' />
                                <div className="pl-3 media-body border border-top-0 border-bottom-0 border-right-0">
                                    <h4>Results:</h4><br></br>
                                    <div className="card">
                                        {
                                            this.props.questions[id].optionOne.votes.findIndex(vote => vote === this.props.authedUser) > -1 && (
                                            <span className="card-your-vote">Your vote</span>
                                        )}
                                        <h5 className="card-header">Would you rather {this.props.questions[id].optionOne.text}?</h5>
                                        <div className="card-body">
                                            <div className="progress">
                                                <div className="progress-bar" role="progressbar" style={opOneStyle} 
                                                    aria-valuenow={opOnePercent} aria-valuemin="0" aria-valuemax="100">{opOneDispPerc}</div>
                                            </div>
                                            <br></br>
                                            <p className="text-sm-center font-weight-bold">{opOneVotes}<span> out of </span>{total}<span> votes</span></p>                                            
                                        </div>
                                    </div>
                                    <br></br>
                                    <div className="card">
                                        {
                                            this.props.questions[id].optionTwo.votes.findIndex(vote => vote === this.props.authedUser) > -1 && (
                                            <span className="card-your-vote">Your vote</span>
                                        )}
                                        <h5 className="card-header">Would you rather {this.props.questions[id].optionTwo.text}?</h5>
                                        <div className="card-body">
                                            <div className="progress">
                                                <div className="progress-bar" role="progressbar" style={opTwoStyle} 
                                                    aria-valuenow={opTwoPercent} aria-valuemin="0" aria-valuemax="100">{opTwoDispPerc}</div>
                                            </div>
                                            <br></br>
                                            <p className="text-sm-center font-weight-bold">{opTwoVotes}<span> out of </span>{total}<span> votes</span></p>  
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ questions, users , authedUser}, props) {
    const { id } = props.match.params
    return {
        id,
        questionIds: Object.keys(questions),
        userIds: Object.keys(users),
        questions,
        users,
        authedUser
    }
}

export default connect(mapStateToProps)(Results);