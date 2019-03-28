import React from 'react'
import { Grid, Header, Button, Icon } from "semantic-ui-react";

import AppLayout from '../AppLayout'
import AddAccountModal from './AddAccountModal';

class SettingsPage extends React.Component {
    state = {
        openAddAccountModal: false,
    };
    toggleAccountModal = () => {
        this.setState({ openAddAccountModal: !this.state.openAddAccountModal });
    }
    render() {
        return (
            <AppLayout>
                <Grid.Row textAlign="center">
                    <Header dividing size="huge" as="h1">
                        Настройки
                        <Button positive floated='right' as="a" onClick={this.toggleAccountModal}>
                            <Icon name="plug" /> Авторизовать аккаунт
                        </Button>
                    </Header>
                </Grid.Row>
                <Grid.Row>
                    
                </Grid.Row>
                <AddAccountModal open={this.state.openAddAccountModal} onClose={this.toggleAccountModal} />
            </AppLayout>
        )
    }
}

export default SettingsPage;