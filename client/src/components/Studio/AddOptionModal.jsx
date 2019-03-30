import React from 'react'
import { Button, Modal, Form, Divider, Message, Select, TextArea } from 'semantic-ui-react'

const options = [
    { key: 'm', text: 'до записи', value: 'before' },
    { key: 'f', text: 'после процедуры', value: 'after' },
]

class AddOptionModal extends React.Component {
    state = {
        days: '',
        text: '',
        when: 'before',
        error: {}
    }

    onChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({ errors: {}, isLoading: true });
        const { days, text, when } = this.state;
        const { studioId } = this.props;
        this.props.addStudioOption({ days, text, when, studioId }).then(({ ok, error }) => {
            if (ok) {
                this.props.addFlashMessage({
                    type: 'success',
                    title: 'Опция успешно добавлена',
                    text: 'Успешное добавление новой опции отправки сообщений',
                });
                this.setState({ studioKey: '', isLoading: false, days: '', text: '', error: {} });
                this.props.onClose();
            }
            else {
                this.setState({ error, isLoading: false })
            }
        })
    }

    onSelect = (e, data) => {
        const { value } = data;
        this.setState({ when: value });
    }

    render() {
        const { error, isLoading } = this.state;
        return (
            <Modal
                size='tiny'
                open={this.props.open}
                onClose={(e) => {
                    this.props.onClose(e);
                }}
            >
                <Modal.Header>Добавление новой опции</Modal.Header>
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
                            <label>Количество дней (0 - сразу после записи)</label>
                            <input placeholder='Количество дней' name="days" value={this.state.days} onChange={this.onChange} required />
                        </Form.Field>
                        {this.state.days != '0' ? (
                            <Form.Field>
                                <label>Выберите тип отправки сообщения</label>
                                <Select placeholder='Выберите студию' options={options} defaultValue={this.state.when} onChange={this.onSelect} />
                            </Form.Field>
                        ) : null}
                        <Form.Field>
                            <label>Введите текст сообщения</label>
                            <TextArea placeholder='Введите текст сообщения' name="text" value={this.state.text} onChange={this.onChange} required />
                        </Form.Field>
                        <Form.Field>
                            <label>
                                %date% - дата записи
                                <br />
                                %master% - имя мастера
                                <br />
                                %service% - название услуги
                            </label>
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

export default AddOptionModal;