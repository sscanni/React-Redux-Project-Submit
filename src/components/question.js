import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleAnsQuest } from '../actions/questions'

class Question extends React.Component {

    checkRadio = (e, id) => {
        e.preventDefault()

        let answer
        if(document.getElementById('one').checked) {
            answer = "optionOne"
        } else if (document.getElementById('two').checked) {
            answer = "optionTwo"
        }
        const { dispatch } = this.props
        dispatch(handleAnsQuest(this.props.authedUser, id, answer))

        console.log("id=", id)

        this.props.history.push(`/questions/${id}`)
    }
    render() {
        const id = this.props.id

        return (
            <div className="card">
                <h5 className="card-header">{this.props.users[this.props.questions[id].author].name} asks:</h5>
                <div className="card-body">
                    <div className="media">
                        <img className='mr-3 mt-3 mb-3 rounded-circle QuestAvatar' 
                                src={'/avatars/' + this.props.users[this.props.questions[id].author].avatarURL} alt='user' />
                        <div className="pl-3 media-body border border-top-0 border-bottom-0 border-right-0">
                            <h4>Would You Rather ...</h4><br></br>
                            <div className="radio-buttons">
                                {
                                (this.props.questions[id].optionOne.votes.findIndex(vote => vote === this.props.authedUser) > -1 ||
                                this.props.questions[id].optionTwo.votes.findIndex(vote => vote === this.props.authedUser) > -1)
                                    ? <input id="one" value="one" name="poll" type="radio" defaultChecked disabled/>
                                    : <input id="one" value="one" name="poll" type="radio" defaultChecked/>
                                }
                                <strong> {this.props.questions[id].optionOne.text}</strong>
                                <br></br>
                                <br></br>
                                {
                                (this.props.questions[id].optionOne.votes.findIndex(vote => vote === this.props.authedUser) > -1 ||
                                this.props.questions[id].optionTwo.votes.findIndex(vote => vote === this.props.authedUser) > -1)
                                    ? <input id="two" value="two" name="poll" type="radio" disabled/>
                                    : <input id="two" value="two" name="poll" type="radio" />
                                }
                                <strong> {this.props.questions[id].optionTwo.text}</strong>
                                <br></br>
                                <br></br>
                            </div>
                            <Link to="" onClick={(e) => this.checkRadio(e, id)}>
                                {
                                (this.props.questions[id].optionOne.votes.findIndex(vote => vote === this.props.authedUser) > -1 ||
                                this.props.questions[id].optionTwo.votes.findIndex(vote => vote === this.props.authedUser) > -1)
                                    ? <button className="btn btn-outline-primary btn-sm btn-block" disabled>Submit</button>
                                    : <button className="btn btn-outline-primary btn-sm btn-block">Submit</button>
                                }
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
                    
function mapStateToProps({questions, users, authedUser }, { id }) {
    return {
        id,
        questionIds: Object.keys(questions),
        userIds: Object.keys(users),
        questions,
        users,
        authedUser 
    }
}
                    
export default withRouter(connect(mapStateToProps)(Question));