import React from 'react'
import { Button, Modal, Form, Divider, Message, Select } from 'semantic-ui-react'

class AddStudioModal extends React.Component {
    state = {
        account_id: '',
        studio: '',
        studioKey: '',
        studios: [],
        error: {}
    }

    onChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({ errors: {}, isLoading: true });
        const { account_id, studio, studioKey } = this.state;
        this.props.addStudio({ account_id, studio, studioKey }).then(({ ok, error, studio }) => {
            if (ok) {
                this.props.addFlashMessage({
                    type: 'success',
                    title: 'Студия добавлена и авторизована',
                    text: 'Успешное добавление и прохождение интеграции студии',
                });
                this.setState({ studioKey: '' });
                this.props.onClose();
            }
            else {
                this.setState({ error, isLoading: false })
            }
        })
    }

    onChangeAccount = (e, data) => {
        const { value } = data;
        const { key } = data.options.find(o => o.value === value);
        this.props.getStudios(value)
            .then(({ ok, studios }) => {
                if (ok) {
                    const accountsOptions = studios.data.map(studio => ({
                        key: studio.id,
                        text: `${studio.name} (id: ${studio.id})`,
                        value: JSON.stringify(studio),
                    }))
                    this.setState({ studios: accountsOptions, account_id: key })
                }
                else {
                    this.setState({ errors, isLoading: false })
                }
            })
    }

    onChangeStudio = (e, data) => {
        const { value } = data;
        this.setState({ studio: value })
    }

    render() {
        const { login, password, apiKey, error, isLoading } = this.state;
        const accountsOptions = this.props.accounts.map(account => ({
            key: account.uid,
            text: `${account.username} (id: ${account.uid})`,
            value: account.token,
          }))
        return (
            <Modal
                size='tiny'
                open={this.props.open}
                onClose={(e) => {
                    this.props.onClose(e);
                }}
            >
                <Modal.Header>Добавление новой студии</Modal.Header>
                <Modal.Content>
                    {error.length > 0 && (
                        <Message
                            error
                            header="Ошибки авторизации"
                            content={error}
                        />
                    )}
                    <Form style={{ width: "100%" }} onSubmit={this.onSubmit}>
                        <Form.Field>
                            <label>Выберите аккаунт</label>
                            <Select placeholder='Выберите аккаунт' options={accountsOptions} onChange={this.onChangeAccount} />
                        </Form.Field>
                        <Form.Field>
                            <label>Выберите студию</label>
                            <Select placeholder='Выберите студию' options={this.state.studios} onChange={this.onChangeStudio} />
                        </Form.Field>
                        <Form.Field>
                            <label>API ключ интеграции</label>
                            <input placeholder='API ключ' name="studioKey" value={this.state.studioKey} onChange={this.onChange} required />
                        </Form.Field>
                        <Divider />
                        <Form.Field>
                            <Button
                                type="button"
                                negative
                                onClick={(e) => {
                                    this.props.onClose(e);
                                }}
                            >
                                Отмена
                        </Button>
                            <Button
                                positive
                                icon='checkmark'
                                labelPosition='right'
                                content='Добавить'
                                type="submit"
                                disabled={isLoading}
                            />
                        </Form.Field>
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
}

export default AddStudioModal;