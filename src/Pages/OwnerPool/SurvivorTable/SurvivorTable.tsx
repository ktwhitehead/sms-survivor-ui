import React from 'React'
import {
  Heading,
  Flex,
  Text,
  Button,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  ScrollView,
} from '@aws-amplify/ui-react'
import { GoCheck } from 'react-icons/go'

const TABLE_HEADERS = [
  'Name',
  'Phone #',
  'Has Paid',
  'Accepted Invite',
  'Week 1',
  'Week 2',
  'Week 3',
  'Week 4',
  'Week 5',
  'Week 6',
  'Week 7',
  'Week 8',
  'Week 9',
  'Week 10',
  'Week 11',
  'Week 12',
  'Week 13',
  'Week 14',
  'Week 15',
  'Week 16',
  'Week 17',
  'Week 18',
]

const SurvivorTable = ({ data }) => {
  return (
    <ScrollView>
      <Table highlightOnHover={false}>
        <TableHead>
          <TableRow>
            {TABLE_HEADERS.map((header) => (
              <TableCell as="th">{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.players?.map((player) => (
            <TableRow>
              <TableCell style={{ whiteSpace: 'nowrap' }}>{player.name}</TableCell>
              <TableCell>{player.phone_number}</TableCell>
              <TableCell>{player.has_paid_entry && <GoCheck />}</TableCell>
              <TableCell>{player.has_accepted_invite && <GoCheck />}</TableCell>
              {player?.picks?.map((pick) => (
                <TableCell backgroundColor="lightgreen">Lions</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollView>
  )
}

export default SurvivorTable
