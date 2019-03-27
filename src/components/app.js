import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import Home from './home'
import Answered from './answered'
import Questions from './questions'
import AddQuestion from './addquestion'
import LeaderBoard from './leaderboard'
import Login from './login'
import NavBar from './navbar'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
            <NavBar /> 
            <LoadingBar />
            {this.props.loading === true
              ? null
              : <div>
                  <Route path='/' exact component={Home} />
                  <Route path='/answered' component={Answered} />
                  <Route path='/questions/:id' component={Questions} />
                  <Route path='/add' component={AddQuestion} />
                  <Route path='/leaderboard' component={LeaderBoard} />                  
                  <Route path='/login' component={Login} />                  
                </div>}
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ loadFlag }) {
  return {
    loading: loadFlag === null
  }
}

export default connect(mapStateToProps)(App)