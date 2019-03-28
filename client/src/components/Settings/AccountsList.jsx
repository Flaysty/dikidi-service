import React from 'react'
import { Button, Table, Image, Icon } from 'semantic-ui-react'

const AccountsList = ({ list }) => (
    <Table celled padded>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.HeaderCell>Логин</Table.HeaderCell>
        <Table.HeaderCell>Имя</Table.HeaderCell>
        <Table.HeaderCell>Действия</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
    {list.map((item) => (
        <Table.Row key={item.id}>
            <Table.Cell collapsing>
                {item.uid}
            </Table.Cell>
            <Table.Cell>
                {item.username}
            </Table.Cell>
            <Table.Cell>
                {item.name}
            </Table.Cell>
            <Table.Cell collapsing>
                <div className='ui two buttons'>
                    <Button color='blue'>
                        <Icon name='cog' className="left" />
                    </Button>
                    <Button color='red'>
                        <Icon name='delete' className="left" />
                    </Button>
                </div>
            </Table.Cell>

        </Table.Row>
      ))}
    </Table.Body>
  </Table>
)

export default AccountsList