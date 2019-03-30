import React from 'react'
import { Button, Table, Image, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const CompaniesList = ({ list, deleteStudio }) => (
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
                {item.sid}
            </Table.Cell>
            <Table.Cell>
                <span dangerouslySetInnerHTML={{ __html: item.name }}  />
            </Table.Cell>
            <Table.Cell>
                {item.address}
            </Table.Cell>
            <Table.Cell collapsing>
                <Link to={`/studio/${item.id}`}>
                    <Button as="span" color='blue' className="padding_button" >
                        <Icon name='cog' className="left no_margin_button" />
                    </Button>
                </Link>
                <Button onClick={deleteStudio.bind(null, item.id)} color='red' className="padding_button" >
                    <Icon name='delete' className="left no_margin_button" />
                </Button>
            </Table.Cell>

        </Table.Row>
      ))}
    </Table.Body>
  </Table>
)

export default CompaniesList