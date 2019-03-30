import React from 'react'
import { Button, Modal, Form, Divider, Message } from 'semantic-ui-react'

class AddAccountModal extends React.Component {
    state = {
        login: '',
        password: '',
        apiKey: '',
        error: {}
    }

    onChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({ errors: {}, isLoading: true });
        const { login, password, apiKey } = this.state;
        this.props.authorizeAccount({ login, password, apiKey }).then(({ ok, error }) => {
            if (ok) {
                this.props.addFlashMessage({
                    type: 'success',
                    title: 'Аккаунт авторизован',
                    text: 'Успешная авторизация dikidi аккаунта',
                });
                this.props.onClose();
            }
            else {
                this.setState({ error, isLoading: false })
            }
        })
    }

    render() {
        const { login, password, apiKey, error, isLoading } = this.state;
        return (
            <Modal
                size='tiny'
                open={this.props.open}
                onClose={(e) => {
                    this.props.onClose(e);
                }}
            >
                <Modal.Header>Авторизовать новый аккаунт</Modal.Header>
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
                            <label>Логин Dikidi</label>
                            <input placeholder='Логин' name="login" value={login} onChange={this.onChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Пароль Dikidi</label>
                            <input placeholder='Пароль' name="password" value={password} onChange={this.onChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>API ключ доступа</label>
                            <input placeholder='API ключ' name="apiKey" value={apiKey} onChange={this.onChange} />
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


export default AddAccountModal;