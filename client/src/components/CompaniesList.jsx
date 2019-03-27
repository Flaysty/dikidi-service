import React from 'react'
import { Button, Table, Image, Icon } from 'semantic-ui-react'

const items = [
    {
        "id": 95649,
        "master": 228489,
        "isOnlineRecord": 0,
        "name": "Татьяна",
        "address": "Москва, Митинская 27",
        "image": "https://f1.dikidi.net/c1/v7/1sktqtiife.jpg?size=m"
    },
    {
        "id": 101015,
        "master": 238331,
        "isOnlineRecord": 0,
        "name": "Божена",
        "address": "Москва, Барышиха 13",
        "image": "https://beauty.dikidi.net/assets/img/salon/101015/profile/90x90/5a04c872b2702.jpg"
    },
    {
        "id": 135705,
        "master": 0,
        "isOnlineRecord": 1,
        "name": "Наращивание Ресниц Митино &quot;Веста&quot;",
        "address": "Москва, Митинская 27",
        "image": "https://beauty.dikidi.net/assets/img/salon/135705/profile/90x90/5ae31e46eb8a4.jpg"
    },
    {
        "id": 185631,
        "master": 0,
        "isOnlineRecord": 1,
        "name": "Наращивание Ресниц Южное Бутово &quot;Веста&quot;",
        "address": "Москва, Адмирала Лазарева 35",
        "image": "https://beauty.dikidi.net/assets/img/salon/185631/profile/90x90/5bf850b6b677f.jpg"
    },
    {
        "id": 202009,
        "master": 0,
        "isOnlineRecord": 0,
        "name": "Наращивание Ресниц Москва",
        "address": "Москва, Пушкина 13",
        "image": "https://f1.dikidi.net/c1/v99/5oeidqfq81.jpg?size=m"
    },
    {
        "id": 216873,
        "master": 0,
        "isOnlineRecord": 0,
        "name": "Студия Наращивания Ресниц Люберцы",
        "address": "Москва, Пушкина 13",
        "image": "https://f1.dikidi.net/c1/v135/740o97uo54.jpg?size=m"
    }
]

const CompaniesList = () => (
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
    {items.map((item) => (
        <Table.Row key={item.id}>
            <Table.Cell>
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
            <Table.Cell>
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