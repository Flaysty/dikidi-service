import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'

import LoginForm from './LoginForm'
import { userLoginRequest } from '../../actions/loginActions'
import { addFlashMessage } from '../../actions/flashMessages'

class LoginPage extends React.Component {
  render() {
    const { userLoginRequest, addFlashMessage, history } = this.props;
    return (
      <div className='login__wrapper'>
        <Helmet>
          <title>Авторизация</title>
        </Helmet>
        <LoginForm userLoginRequest={userLoginRequest} addFlashMessage={addFlashMessage} history={history} />
      </div>
    )
  }
}

export default connect(null, { userLoginRequest, addFlashMessage })(LoginPage);