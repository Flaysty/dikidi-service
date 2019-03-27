import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Divider, Grid, Header, Icon, Image, Menu, Table } from "semantic-ui-react";

import { logout } from '../actions/loginActions';

class NavigationBar extends React.Component {
    state = {
        dropdownMenuStyle: {
            display: "none"
        },
    };

    handleToggleDropdownMenu = () => {
        let newState = Object.assign({}, this.state);
        if (newState.dropdownMenuStyle.display === "none") {
            newState.dropdownMenuStyle = { display: "flex" };
        } else {
            newState.dropdownMenuStyle = { display: "none" };
        }

        this.setState(newState);
    };

    logout = (e) => {
        e.preventDefault();
        this.props.logout();
    }

    render() {
        const { isAuthenticated } = this.props.auth;
        return (
            <>
                <Grid padded className="tablet computer only">
                    <Menu borderless inverted fluid fixed="top">
                        <Menu.Item header as="a" style={{ fontSize: 22, padding: 10 }}>
                            <Image src="/assets/logo.png" size="mini" verticalAlign="top" /> Ananas69
                        </Menu.Item>
                        <Menu.Menu position="right">
                            {isAuthenticated && <Menu.Item as="a" onClick={this.props.logout}>Выйти</Menu.Item>}
                        </Menu.Menu>
                    </Menu>
                </Grid>
                <Grid padded className="mobile only">
                    <Menu borderless inverted fluid fixed="top">
                        <Menu.Item header as="a">
                            Ananas69
                        </Menu.Item>
                        <Menu.Menu position="right">
                            <Menu.Item>
                                <Button
                                    basic
                                    inverted
                                    icon
                                    toggle
                                    onClick={this.handleToggleDropdownMenu}
                                >
                                    <Icon name="content" />
                                </Button>
                            </Menu.Item>
                        </Menu.Menu>
                        <Menu
                            borderless
                            fluid
                            inverted
                            vertical
                            style={this.state.dropdownMenuStyle}
                        >
                            {isAuthenticated && <Menu.Item as="a" onClick={this.props.logout}>Выйти</Menu.Item>}
                            <Divider fitted />
                        </Menu>
                    </Menu>
                </Grid>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps, { logout })(NavigationBar);