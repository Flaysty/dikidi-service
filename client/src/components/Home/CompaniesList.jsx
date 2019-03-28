import React from 'react'
import { Button, Table, Image, Icon } from 'semantic-ui-react'

const CompaniesList = ({ list }) => (
    <Table celled padded>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell singleLine></Table.HeaderCell>
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.HeaderCell>Название</Table.HeaderCell>
        <Table.HeaderCell>Адрес</Table.HeaderCell>
        <Table.HeaderCell>Действия</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
    {list && list.map((item) => (
        <Table.Row key={item.id}>
            <Table.Cell collapsing>
                <Image floated='right' size='mini' src={item.image} />
            </Table.Cell>
            <Table.Cell>
                {item.id}
            </Table.Cell>
            <Table.Cell>
                <span dangerouslySetInnerHTML={{ __html: item.name }}  />
            </Table.Cell>
            <Table.Cell>
                {item.address}
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

export default CompaniesList