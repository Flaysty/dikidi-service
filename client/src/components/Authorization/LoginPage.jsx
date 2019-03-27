import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'

import LoginForm from './LoginForm'
import { userLoginRequest } from '../../actions/loginActions'

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { userLoginRequest, history } = this.props;
    return (
      <div className='login__wrapper'>
        <Helmet>
          <title>Авторизация</title>
        </Helmet>
        <LoginForm userLoginRequest={userLoginRequest} history={history} />
      </div>
    )
  }
}

export default connect(null, { userLoginRequest })(LoginPage);