import React from 'react'
import { Grid, Header, Button, Icon } from "semantic-ui-react";
import { connect } from 'react-redux'

import AppLayout from '../AppLayout'
import AddAccountModal from './AddAccountModal';
import { addFlashMessage } from '../../actions/flashMessages';
import { authorizeAccount } from '../../actions/apiActions'
import { fetchAccounts } from '../../actions/fetchActions'
import AccountsList from './AccountsList';

class SettingsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openAddAccountModal: false,
        };
    }
    componentDidMount() {
        this.props.fetchAccounts();
    }
    toggleAccountModal = () => {
        this.setState({ openAddAccountModal: !this.state.openAddAccountModal });
    }
    render() {
        const { authorizeAccount, addFlashMessage } = this.props;
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
                    {this.props.accounts ? (
                        <AccountsList list={this.props.accounts} />
                    ) : null}
                </Grid.Row>
                <AddAccountModal open={this.state.openAddAccountModal} onClose={this.toggleAccountModal} authorizeAccount={authorizeAccount} addFlashMessage={addFlashMessage} />
            </AppLayout>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        accounts: state.api.accounts
    };
}

export default connect(mapStateToProps, { authorizeAccount, addFlashMessage, fetchAccounts })(SettingsPage);