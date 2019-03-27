import React, { Component } from "react";
import { Button, Divider, Grid, Header, Icon, Menu, Table } from "semantic-ui-react";
import { NavLink } from 'react-router-dom'

import NavigationBar from './NavigationBar'
import FlashMessagesList from './Flash/FlashMessagesList'

class AppLayout extends Component {
    render() {
        return (
            <div className="App">
                <NavigationBar />
                <Grid padded>
                    <Grid.Column
                        tablet={3}
                        computer={3}
                        only="tablet computer"
                        id="sidebar"
                    >
                        <Menu secondary vertical fluid>
                            <NavLink
                                className="item"
                                exact={true}
                                to="/"
                            >
                                <Icon name='home' className="left" /> Главная
                            </NavLink>
                            <NavLink
                                className="item"
                                exact={true}
                                to="/settings"
                            >
                                <Icon name='cog' className="left" /> Настройки
                            </NavLink>
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
                                <FlashMessagesList />
                            </Grid.Row>
                            {this.props.children}
                        </Grid>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default AppLayout;