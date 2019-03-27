import React from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAnsQuest } from '../actions/questions'
import Results from './results'
import Question from './question'

class Questions extends React.Component {

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

        this.props.history.push(`/questions/${id}`)
    }
    render() {
        const { id } = this.props
        if (this.props.authedUser === null) {
            return <Redirect
                    to={{
                    pathname: "/login",
                    search: id,
                    state: { referrer: "/questions/" + id}
                    }}
                />
        }

        if (!(id in this.props.questions)) {
            return (
                <div className="container col-md-2 mt-3">
                    <h4>404 Page Not Found</h4>
                </div>   
            )
        }

        return (
            <div className="container col-md-4 mt-3">
                <div className="card-body">
                    {
                    (this.props.questions[id].optionOne.votes.findIndex(vote => vote === this.props.authedUser) === -1 && 
                    this.props.questions[id].optionTwo.votes.findIndex(vote => vote === this.props.authedUser) === -1)
                    ?  <Question id={id} />
                    :  <Results id={id} />
                    }
                </div>
            </div>
        )
    }
}
                    
function mapStateToProps({questions, users, authedUser }, props) {
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
                    
export default connect(mapStateToProps)(Questions);