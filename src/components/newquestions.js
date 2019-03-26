import React from 'react';
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
// import { Redirect } from 'react-router-dom'
// import { handleAnsQuest } from '../actions/questions'
import Results from './results'
import Questions from './questions'

class NewQuestions extends React.Component {

  render() {
    const { id } = this.props
    return (
    <div>
      {
      (this.props.questions[id].optionOne.votes.findIndex(vote => vote === this.props.authedUser) > -1 ||
      this.props.questions[id].optionTwo.votes.findIndex(vote => vote === this.props.authedUser) > -1) 
      ? <div><Results id={id} /></div>
      : <div><Questions id={id} /></div>
      }
    </div>
    )
  }
}

function mapStateToProps({questions, users, authedUser }, props) {
  const { id } = props.match.params
  console.log("newquestions id=", id)
  return {
      id,
      questionIds: Object.keys(questions),
      userIds: Object.keys(users),
      questions,
      users,
      authedUser 
  }
}
                  
export default connect(mapStateToProps)(NewQuestions);