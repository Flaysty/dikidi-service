import React from 'react'
import { Helmet } from 'react-helmet'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }

  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.userLoginRequest(this.state);
  }

  render() {
    return (
      <Grid textAlign='center' style={{ height: '100%', margin: 0 }} verticalAlign='middle'>
          <Grid.Column className="login__form">
            <Header as='h2' textAlign='center'>
              <Image src="http://crm.ananas69.ru/images/logo.png" size="mini" verticalAlign="top" /> Авторизация
            </Header>
            <Form size='large' onSubmit={this.onSubmit}>
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='Логин'
                name="username"
                onChange={this.onChange}
                value={this.state.username}
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
              />
              <Button primary fluid size='large' type="submit">
                Войти
              </Button>
            </Form>
          </Grid.Column>
        </Grid>
    )
  }
}

export default LoginForm