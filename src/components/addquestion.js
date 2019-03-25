import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { handleAddQuest } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends React.Component {

    addQuestion = (e) => {
        e.preventDefault()

        const optionOneText = document.getElementById('question1').value
        const optionTwoText = document.getElementById('question2').value

        if (optionOneText.trim() !== '' && optionTwoText.trim() !== '') {
            const { dispatch } = this.props
            dispatch(handleAddQuest(this.props.authedUser, optionOneText, optionTwoText))
            this.props.history.push('/')
        } else {
            alert ("Both questions must be entered. Please try again.")
        }
    }

    render() {
        if (this.props.authedUser === null) {
            return <Redirect to='/login' />
        }
        return (
            <div>
                <div className="container col-md-4 mt-3">
                    <div className="card-body">
                        <div className="card">
                            <h4 className="card-header text-center">Create New Question</h4>
                            <div className="card-body">
                                <p>Complete the question</p>
                                <h5>Would You Rather ...</h5><br></br>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="question1"></input>
                                </div>
                                <strong>
                                    <p className="text-center">OR</p>
                                </strong>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="question2"></input>
                                </div>                
                                {/* <a href="index.html" className="btn btn-outline-primary btn-sm btn-block">Submit</a> */}
                                <Link to="" onClick={(e) => this.addQuestion(e)}>
                                    <button className="btn btn-outline-primary btn-sm btn-block">Submit</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ questions, users, authedUser }) {
    return {
        questionIds: Object.keys(questions),
        userIds: Object.keys(users),
        questions,
        users,
        authedUser
    }
}

export default connect(mapStateToProps)(NewQuestion);