import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'

const AddStudioModal = ({ open, onClose }) => (
    <Modal
        size='tiny'
        open={open}
        onClose={(e) => {
            onClose(e);
        }}
    >
        <Modal.Header>Добавление новой студии</Modal.Header>
        <Modal.Content>
            <p>Выберите студию для добавления</p>
        </Modal.Content>
        <Modal.Actions>
            <Button
                negative
                onClick={(e) => {
                    onClose(e);
                }}
            >
                Отмена
            </Button>
            <Button positive icon='checkmark' labelPosition='right' content='Авторизовать' />
        </Modal.Actions>
    </Modal>
)


export default AddStudioModal;