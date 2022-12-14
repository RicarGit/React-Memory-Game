import { CardStatus } from 'types/CardStatus'
import { ThemeProps } from 'types/ThemeProps'

import { cards } from 'shared/cards'
import b7Svg from 'assets/svgs/b7.svg'
import b7DarkSvg from 'assets/svgs/b7Dark.svg'
import * as C from './styles'

type Props = {
  card: CardStatus
  currentTheme: ThemeProps
  onClick: () => void
}

export const CardItem = ({ card, onClick, currentTheme }: Props) => {
  const { cardIndex, upturnedCard, fixedUpturnedCard } = card

  return (
    <C.Container
      showBackground={card.fixedUpturnedCard || card.upturnedCard}
      showBorder={card.fixedUpturnedCard || card.upturnedCard}
      currentTheme={currentTheme}
      flip={card.upturnedCard || card.fixedUpturnedCard}
      onClick={onClick}
    >
      {fixedUpturnedCard || upturnedCard ||
        <C.Icon src={currentTheme === 'dark' ? b7DarkSvg : b7Svg} />
      }
      {(fixedUpturnedCard || upturnedCard) &&
        <C.Icon src={cards[cardIndex!].icon} />
      }
    </C.Container>
  )
}