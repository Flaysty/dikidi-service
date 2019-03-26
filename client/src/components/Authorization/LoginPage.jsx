import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'

import LoginForm from './LoginForm'
import { userLoginRequest } from '../../actions/loginActions'

class LoginPage extends React.Component {
  render() {
    const { userLoginRequest } = this.props;
    return (
      <div className='login__wrapper'>
        <Helmet>
          <title>Авторизация</title>
        </Helmet>
        <LoginForm userLoginRequest={userLoginRequest} />
      </div>
    )
  }
}

export default connect(null, { userLoginRequest })(LoginPage);