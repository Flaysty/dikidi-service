import React from 'react'
import { Helmet } from 'react-helmet'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


class LoginForm extends React.Component {
  render() {
    return (
      <div className='login__wrapper'>
        <Helmet>
          <title>Авторизация</title>
        </Helmet>
        <Grid textAlign='center' style={{ height: '100%', margin: 0 }} verticalAlign='middle'>
          <Grid.Column className="login__form">
            <Header as='h2' textAlign='center'>
            <Image src="http://crm.ananas69.ru/images/logo.png" size="mini" verticalAlign="top" /> Авторизация
            </Header>
            <Form size='large'>
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='Логин'
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Пароль'
                type='password'
              />
    
              <Link to="/home">
                <Button as="a" primary fluid size='large'>
                  Войти
                </Button>
              </Link>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default LoginForm