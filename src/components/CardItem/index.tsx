import { CardStatus } from '../../types/CardStatus'
import * as C from './styles'

type Props = {
  card: CardStatus
  onClick: () => void
}

export const CardItem = ({ card, onClick }: Props) => {
  return (
    <C.Container onClick={onClick}>
      {card.cardIndex?.toString()}
    </C.Container>
  )
}