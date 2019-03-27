import React from 'react'
import { Grid, Header } from "semantic-ui-react";

import AppLayout from '../AppLayout'

class SettingsPage extends React.Component {
    render() {
        return (
            <AppLayout>
                <Grid.Row textAlign="center">
                    <Header dividing size="huge" as="h1">
                        Настройки
                    </Header>
                </Grid.Row>
            </AppLayout>
        )
    }
}

export default SettingsPage;