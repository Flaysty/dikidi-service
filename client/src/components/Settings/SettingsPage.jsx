import React from 'react'
import { Grid } from "semantic-ui-react";

import AppLayout from '../AppLayout'

class SettingsPage extends React.Component {
    render() {
        return (
            <AppLayout>
                <Grid.Row textAlign="center">
                    <h1>Настройки</h1>
                </Grid.Row>
            </AppLayout>
        )
    }
}

export default SettingsPage;