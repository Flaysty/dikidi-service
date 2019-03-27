import React, { Component } from "react";
import { Button, Divider, Grid, Header, Icon, Image, Menu, Table } from "semantic-ui-react";
import { Helmet } from 'react-helmet'

import NavigationBar from './NavigationBar'
import CompaniesList from './CompaniesList'
import AddStudioModal from './AddStudioModal';

class Home extends Component {
  state = {
    activeItem: 'home',
    openAddStudioModal: false,
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })


  toggleStudioModal = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.setState({ openAddStudioModal: !this.state.openAddStudioModal });
  }

  render() {
    const { activeItem } = this.state
    return (
      <div className="App">
        <Helmet>
          <title>Панель управления</title>
        </Helmet>
        <NavigationBar />
        <Grid padded>
          <Grid.Column
            tablet={3}
            computer={3}
            only="tablet computer"
            id="sidebar"
          >
            <Menu secondary vertical fluid>
              <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick}>
                <Icon name="home" className="left" />Главная
              </Menu.Item>
              <Menu.Item
                name='settings'
                active={activeItem === 'settings'}
                onClick={this.handleItemClick}
              >
                <Icon name='cog' className="left" /> Настройки
              </Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column
            mobile={16}
            tablet={13}
            computer={13}
            floated="right"
            id="content"
          >
            <Grid padded>
              <Grid.Row>
                <Header dividing size="huge" as="h1">
                  Студии
                  <Button positive floated='right' onClick={this.toggleStudioModal}>
                    <Icon name="plus" /> Добавить студию
                  </Button>
                </Header>
              </Grid.Row>
              <Grid.Row textAlign="center">
                <CompaniesList />
              </Grid.Row>
              <Divider section hidden />
              <Grid.Row>
                <Header dividing size="huge" as="h1">
                  Последние действия
                </Header>
              </Grid.Row>
              <Grid.Row>
                <Table singleLine striped selectable unstackable>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>#</Table.HeaderCell>
                      <Table.HeaderCell>Header</Table.HeaderCell>
                      <Table.HeaderCell>Header</Table.HeaderCell>
                      <Table.HeaderCell>Header</Table.HeaderCell>
                      <Table.HeaderCell>Header</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>1.001</Table.Cell>
                      <Table.Cell>Lorem</Table.Cell>
                      <Table.Cell>ipsum</Table.Cell>
                      <Table.Cell>dolor</Table.Cell>
                      <Table.Cell>sit</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid>
        <AddStudioModal open={this.state.openAddStudioModal} onClose={this.toggleStudioModal} />
      </div>
    );
  }
}

export default Home;