import React from 'react'
import { Table, TableHead, TableRow, TableBody, TableCell, ScrollView } from '@aws-amplify/ui-react'
import { GoCheck } from 'react-icons/go'
import { HiMinus } from 'react-icons/hi'

const NFL_WEEKS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]

const TABLE_HEADERS = [
  'Player Name',
  'Phone #',
  'Paid Entry Fee',
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

const determineColor = (pick, currentWeek) => {
  if (pick?.week > currentWeek) return 'white'
  if (pick?.week === currentWeek) return 'lightgray'
  if (pick?.isWinner) return 'lightgreen'
  if (pick && !pick?.isWinner) return 'red'
}

const SurvivorTable = ({ data, publicView = false }) => {
  return (
    <ScrollView>
      <Table highlightOnHover={false}>
        <TableHead>
          <TableRow>
            {TABLE_HEADERS.filter((h) => (publicView ? h !== 'Phone #' : true)).map((header) => (
              <TableCell as="th">{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.players
            ?.filter((p) => p.id)
            .map((player) => (
              <TableRow>
                <TableCell style={{ whiteSpace: 'nowrap' }}>{player.name}</TableCell>
                {!publicView && <TableCell>{player.phone_number}</TableCell>}
                <TableCell>{player.has_paid_entry ? <GoCheck /> : <HiMinus />}</TableCell>
                <TableCell>{player.has_accepted_invite ? <GoCheck /> : <HiMinus />}</TableCell>
                {NFL_WEEKS.map((week) => {
                  const pick = data?.picks.filter((p) => p.week === week && p.player_id === player.id)?.[0]
                  return (
                    <TableCell backgroundColor={determineColor(pick, data.currentWeek)}>
                      {pick ? pick.team : week > data.currentWeek ? <></> : <HiMinus />}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </ScrollView>
  )
}

export default SurvivorTable
