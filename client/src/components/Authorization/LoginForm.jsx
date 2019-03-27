import React from 'react'
import { Helmet } from 'react-helmet'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {},
    }
  }

  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ errors: {}, isLoading: true });

    this.props.userLoginRequest({ username: this.state.username.toLowerCase(), password: this.state.password }).then(({ ok, errors }) => {
      if (ok) {
        this.props.addFlashMessage({
          type: 'success',
          title: 'Авторизация',
          text: 'Успешная авторизация',
        });
        this.props.history.push('/')
      }
      else {
        this.setState({ errors, isLoading: false })
      }
    })
  }

  render() {
    const { errors: { usernameError, passwordError } } = this.state;
    const errorList = [];
    if (usernameError) {
      errorList.push(usernameError);
    }
    if (passwordError) {
      errorList.push(passwordError);
    }
    return (
      <Grid textAlign='center' style={{ height: '100%', margin: 0 }} verticalAlign='middle'>
        <Grid.Column className="login__form">
          <Header as='h2' textAlign='center'>
            <Image src="http://crm.ananas69.ru/images/logo.png" size="mini" verticalAlign="top" /> Авторизация
            </Header>
            {errorList.length > 0 ? (
          <Message
            error
            header="Ошибки заполнения формы авторизации"
            list={errorList}
          />
        ) : null}
          <Form size='large' onSubmit={this.onSubmit}>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='Логин'
              name="username"
              onChange={this.onChange}
              value={this.state.username}
              error={!!usernameError}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Пароль'
              name="password"
              type='password'
              onChange={this.onChange}
              value={this.state.password}
              error={!!passwordError}
            />
            <Button primary fluid size='large' type="submit" disabled={this.state.isLoading}>
              Войти
              </Button>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

export default LoginForm