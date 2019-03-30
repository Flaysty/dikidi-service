import React, { Component } from "react";
import { Button, Divider, Grid, Header, Icon, Table, Comment, Form, TextArea, Label } from "semantic-ui-react";
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import findIndex from 'lodash/findIndex'
import isEmpty from 'lodash/isEmpty'

import AppLayout from '../AppLayout'
import { fetchStudios } from '../../actions/fetchActions';
import { addFlashMessage } from '../../actions/flashMessages';
import { addStudioOption, fetchStudioOptions, editStudioOptions, deleteStudioOption } from '../../actions/studioActions'
import AddOptionModal from './AddOptionModal';
import EditOptionModal from './EditOptionModal';
import OptionsList from './OptionsList';

class StudioPage extends Component {
    state = {
        studio: {},
        editOption: {},
        openAddStudioModal: false,
        openEditOptionModal: false,
    }
    componentWillMount() {
        const { match: { params: { studioId } }, fetchStudios, studio } = this.props;
        const index = findIndex(studio, { id: parseInt(studioId) });
        if (index >= 0) {
            this.setState({ studio: studio[index] });
        } else {
            fetchStudios();
        }
        this.props.fetchStudioOptions(studioId);
    }
    componentWillReceiveProps(nextProps) {
        if (isEmpty(this.state.studio)) {
            const { match: { params: { studioId } }, studio } = nextProps;
            const index = findIndex(studio, { id: parseInt(studioId) });
            if (index >= 0) {
                this.setState({ studio: studio[index] });
            } else {
                this.props.history.push('/')
            }
        }
    }
    toggleStudioModal = () => {
        this.setState({ openAddStudioModal: !this.state.openAddStudioModal });
    }
    toggleEditOptionModal = () => {
        this.setState({ openEditOptionModal: !this.state.openEditOptionModal });
    }
    editOption = (id) => {
        const { option } = this.props;
        const index = findIndex(option, { id });
        this.toggleEditOptionModal();
        this.setState({ editOption: option[index] });
    }
    render() {
        const { match: { params: { studioId } }, option } = this.props;
        const { studio } = this.state;
        return (
            <AppLayout>
                <Helmet>
                    <title>Панель управления</title>
                </Helmet>
                <Grid.Row>
                    <Header size="huge" as="h1">
                        <span dangerouslySetInnerHTML={{ __html: `${studio.name} (id: ${studio.sid})` }}></span>
                    </Header>
                </Grid.Row>
                <Grid.Row>
                    <Link to="/">
                        <Button basic primary floated='right'>
                            <Icon name="arrow alternate circle left outline" /> Назад к панели управления
                            </Button>
                    </Link>
                </Grid.Row>
                <Grid.Row textAlign="center">
                    <Comment.Group>
                        <Comment>
                            <Comment.Avatar as='a' src={studio.image} />
                            <Comment.Content>
                                <Comment.Author dangerouslySetInnerHTML={{ __html: studio.name }} />
                                <Comment.Text>
                                    {studio.address}
                                </Comment.Text>
                            </Comment.Content>
                        </Comment>
                    </Comment.Group>
                </Grid.Row>
                <Grid.Row>
                    <Button positive onClick={this.toggleStudioModal}>
                        <Icon name="plus" /> Добавить опцию
                    </Button>
                </Grid.Row>
                <Grid.Row>
                    <OptionsList list={this.props.option} toggleEditOptionModal={this.toggleEditOptionModal} editOption={this.editOption} deleteStudioOption={this.props.deleteStudioOption} />
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
                <AddOptionModal open={this.state.openAddStudioModal} onClose={this.toggleStudioModal} addFlashMessage={this.props.addFlashMessage} addStudioOption={this.props.addStudioOption} studioId={studioId} />
                <EditOptionModal open={this.state.openEditOptionModal} onClose={this.toggleEditOptionModal} addFlashMessage={this.props.addFlashMessage} studioId={studioId} editOption={this.state.editOption} editStudioOptions={this.props.editStudioOptions} />
            </AppLayout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        studio: state.studio,
        option: state.option
    }
}

export default connect(mapStateToProps, { fetchStudioOptions, fetchStudios, addFlashMessage, addStudioOption, editStudioOptions, deleteStudioOption })(StudioPage);