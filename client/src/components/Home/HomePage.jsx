import React, { Component } from "react";
import { Button, Divider, Grid, Header, Icon, Table } from "semantic-ui-react";
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'

import AppLayout from '../AppLayout'
import CompaniesList from './CompaniesList'
import AddStudioModal from './AddStudioModal';
import { addStudio, deleteStudio } from '../../actions/studioActions'
import { fetchAccounts, fetchStudios } from '../../actions/fetchActions'
import { getStudios } from '../../actions/apiActions';
import { addFlashMessage } from '../../actions/flashMessages'

class Home extends Component {
    state = {
        openAddStudioModal: false,
    };

    componentDidMount() {
        this.props.fetchStudios();
    }

    toggleStudioModal = (e) => {
        if (e) {
            e.preventDefault();
        }
        if(!this.state.openAddStudioModal) {
            this.props.fetchAccounts();
        }
        this.setState({ openAddStudioModal: !this.state.openAddStudioModal });
    }

    render() {
        return (
            <AppLayout>
                <Helmet>
                    <title>Панель управления</title>
                </Helmet>
                <Grid.Row>
                    <Header dividing size="huge" as="h1">
                        Студии
                        <Button positive floated='right' onClick={this.toggleStudioModal}>
                            <Icon name="plus" /> Добавить студию
                        </Button>
                    </Header>
                </Grid.Row>
                <Grid.Row textAlign="center">
                    <CompaniesList deleteStudio={this.props.deleteStudio} list={this.props.studio} />
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
                <AddStudioModal open={this.state.openAddStudioModal} onClose={this.toggleStudioModal} addStudio={this.props.addStudio} accounts={this.props.accounts} getStudios={this.props.getStudios} addFlashMessage={this.props.addFlashMessage} />
            </AppLayout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        accounts: state.api.accounts,
        studio: state.studio
    };
}

export default connect(mapStateToProps, { addStudio, deleteStudio, fetchAccounts, fetchStudios, getStudios, addFlashMessage })(Home);