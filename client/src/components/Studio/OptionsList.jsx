import React from 'react'
import { Button, Table, Icon } from 'semantic-ui-react'

const OptionsList = ({ list, editOption, deleteStudioOption }) => (
    <Table celled padded>
        <Table.Body>
            {list && list.map((item) => (
                <Table.Row key={item.id}>
                    <Table.Cell style={{ fontWeight: 400 }}>
                        <p style={{ fontWeight: 700, marginBottom: 10 }}>{
                            item.days == 0 ? 'Сразу после записи' : item.when === 'after' ? `Через ${item.days} дней после процедуры` : `За ${item.days} дней до записи`
                        }</p>
                        {item.text}
                    </Table.Cell>
                    <Table.Cell>
                        <span style={{ fontWeight: 700, marginBottom: 10 }}>Отправлено: </span>{item.counter} сообщений
            </Table.Cell>
                    <Table.Cell collapsing>
                        <Button as="span" color='blue' className="padding_button" onClick={editOption.bind(null, item.id)}>
                            <Icon name='cog' className="left no_margin_button" />
                        </Button>
                        <Button color='red' className="padding_button" onClick={deleteStudioOption.bind(null, item.id)} >
                            <Icon name='delete' className="left no_margin_button" />
                        </Button>
                    </Table.Cell>

                </Table.Row>
            ))}
        </Table.Body>
    </Table>
)

export default OptionsList