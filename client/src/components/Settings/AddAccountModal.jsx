import React from 'react'
import { Button, Modal, Form, Divider } from 'semantic-ui-react'

const AddAccountModal = ({ open, onClose }) => (
    <Modal
        size='tiny'
        open={open}
        onClose={(e) => {
            onClose(e);
        }}
    >
        <Modal.Header>Авторизовать новый аккаунт</Modal.Header>
        <Modal.Content>
            <Form style={{ width: "100%" }}>
                <Form.Field>
                    <label>Логин Dikidi</label>
                    <input placeholder='Логин' />
                </Form.Field>
                <Form.Field>
                    <label>Пароль Dikidi</label>
                    <input placeholder='Пароль' />
                </Form.Field>
                <Form.Field>
                    <label>API ключ доступа</label>
                    <input placeholder='API ключ' />
                </Form.Field>
                <Divider />
                <Form.Field>
                    <Button
                        negative
                        onClick={(e) => {
                            onClose(e);
                        }}
                    >
                        Отмена
                </Button>
                    <Button
                        positive
                        icon='checkmark'
                        labelPosition='right'
                        content='Добавить'
                    />
                </Form.Field>
            </Form>
        </Modal.Content>
    </Modal>
)


export default AddAccountModal;