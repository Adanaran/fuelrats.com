// Module imports
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import React from 'react'
import withRedux from 'next-redux-wrapper'





// Module imports
import {
  actions,
  initStore,
} from '../store'
import AddNicknameForm from './AddNicknameForm'
import Component from './Component'





class UserNicknamesPanel extends Component {

  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  render () {
    let { user } = this.props

    if (!Array.isArray(user.attributes.nicknames)) {
      user.attributes.nicknames = [user.attributes.nicknames]
    }

    return (
      <div className="panel user-nicknames">
        <header>IRC Nicknames</header>

        <div className="panel-content">
          <div className="row">
            <ul>
              {(user.attributes && user.attributes.nicknames) && user.attributes.nicknames.map((nickname, index) => <li key={index}>{nickname}</li>)}
            </ul>
          </div>

          <AddNicknameForm />
        </div>
      </div>
    )
  }
}





const mapDispatchToProps = dispatch => {
  return {
    getRats: bindActionCreators(actions.getRats, dispatch),
  }
}

const mapStateToProps = state => {
  let {
    user,
  } = state

  return {
    user
  }
}





export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(UserNicknamesPanel)
