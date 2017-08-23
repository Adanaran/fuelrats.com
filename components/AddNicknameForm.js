// Module imports
import { bindActionCreators } from 'redux'
import React from 'react'
import withRedux from 'next-redux-wrapper'





// Module imports
import {
  actions,
  initStore,
} from '../store'
import Component from './Component'





class AddNicknameForm extends Component {

  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (props) {
    super(props)

    this._bindMethods(['onSubmit'])

    this.state = {
      nickname: '',
      password: '',
      submitting: false,
    }
  }

  async onSubmit (event) {
    let {
      registerNickname,
    } = this.props
    let {
      nickname,
      password,
    } = this.state

    event.preventDefault()

    this.setState({ submitting: true })

    await registerNickname(nickname, password)

    this.setState({
      nickname: '',
      password: '',
      submitting: false ,
    })
  }

  render () {
    let {
      nickname,
      submitting,
    } = this.state

    return (
      <form
        className="row"
        onSubmit={this.onSubmit}>
        <input
          className="stretch-9"
          name="add-nickname"
          onChange={event => this.setState({ nickname: event.target.value })}
          placeholder="Add a nickname..."
          type="text" />
        <button
          disabled={!nickname || submitting}
          type="submit">
          Add
        </button>
      </form>
    )
  }
}





const mapDispatchToProps = dispatch => {
  return {
    registerNickname: bindActionCreators(actions.registerNickname, dispatch),
  }
}





export default withRedux(initStore, null, mapDispatchToProps)(AddNicknameForm)
