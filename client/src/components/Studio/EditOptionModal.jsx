import React from 'react'
import { Button, Modal, Form, Divider, Message, Select, TextArea } from 'semantic-ui-react'
const options = [
    { key: 'm', text: 'до записи', value: 'before' },
    { key: 'f', text: 'после процедуры', value: 'after' },
]

const statusOptions = [
    { key: 'e', text: 'активно', value: true },
    { key: 'd', text: 'отключено', value: false },
]

class EditOptionModal extends React.Component {
    state = {
        id: '',
        days: '',
        text: '',
        when: 'before',
        active: '',
        error: {}
    }

    componentWillReceiveProps(nextProps) {
        const { editOption } = nextProps;
        this.setState({
            id: editOption.id,
            days: editOption.days,
            state: editOption.state,
            text: editOption.text,
            when: editOption.when,
        });
    }

    onChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({ errors: {}, isLoading: true });
        const { id, state, days, text, when } = this.state;
        const { studioId } = this.props;
        this.props.editStudioOptions({ id, days, text, when, state, studioId }).then(({ ok, error }) => {
            if (ok) {
                this.props.addFlashMessage({
                    type: 'success',
                    title: 'Опция успешно отредактирована',
                    text: 'Изменения сохранены',
                });
                this.setState({ id: '', when: 'before', isLoading: false, days: '', text: '', state: '', error: {} });
                this.props.onClose();
            }
            else {
                this.setState({ error, isLoading: false })
            }
        })
    }

    onSelect = (e, data) => {
        const { value, name } = data;
        this.setState({ [name]: value });
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
                <Modal.Header>Редактирование опции</Modal.Header>
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
                            <label>Выберите статус</label>
                            <Select placeholder='Выберите статус' options={statusOptions} defaultValue={this.state.state} name='state' onChange={this.onSelect} />
                        </Form.Field>
                        <Form.Field>
                            <label>Количество дней (0 - сразу после записи)</label>
                            <input placeholder='Количество дней' name="days" value={this.state.days} onChange={this.onChange} required />
                        </Form.Field>
                        {this.state.days != '0' ? (
                            <Form.Field>
                                <label>Выберите тип отправки сообщения</label>
                                <Select placeholder='Выберите тип отправки сообщения' name='when' options={options} defaultValue={this.state.when} onChange={this.onSelect} />
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
                                content='Сохранить'
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

export default EditOptionModal;