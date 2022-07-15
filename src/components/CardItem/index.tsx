import { CardStatus } from '../../types/CardStatus'
import { cards } from '../../utils/cards'
import b7Svg from './../../svgs/b7.svg'
import * as C from './styles'

type Props = {
  card: CardStatus
  onClick: () => void
}

export const CardItem = ({ card, onClick }: Props) => {
  const { cardIndex, upturnedCard, fixedUpturnedCard } = card

  return (
    <C.Container onClick={onClick}>
      {fixedUpturnedCard || upturnedCard ||
        <C.Icon src={b7Svg} alt="card's back" />
      }
      {(fixedUpturnedCard || upturnedCard) &&
        <C.Icon src={cards[cardIndex!].icon} alt="card's front" />
      }
    </C.Container>
  )
}