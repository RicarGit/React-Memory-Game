import { useEffect, useState } from 'react'

import * as C from './App.styles'
import logoImage from './assets/devmemory_logo.png'
import restartIcon from './svgs/restart.svg'

import { GameInfoItem } from './components/GameInfoItem'
import { Button } from './components/Button'
import { CardStatus } from './types/CardStatus'
import { CardItem } from './components/CardItem'

import { cards } from './utils/cards'
import { formatTimeElapsed } from './utils/formatTimeElapsed'

const App = () => {
  const [playing, setPlaying] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [moveCount, setMoveCount] = useState(0)
  const [upturnedCardsCount, setUpturnedCardsCount] = useState(0)
  const [cardStatus, setCardStatus] = useState<CardStatus[]>([])

  useEffect(() => resetGameGrid, [])

  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) {
        setTimeElapsed(timeElapsed + 1)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [playing, timeElapsed])

  useEffect(() => {
    if (upturnedCardsCount === 2) {
      const upturnedCards = cardStatus.filter(card => card.upturnedCard)

      if (upturnedCards.length === 2) {
        const newCardStatus = [...cardStatus]
        const [firstUpturnedCard, secondUpturnedCard] = upturnedCards

        if (firstUpturnedCard.cardIndex === secondUpturnedCard.cardIndex) {
          newCardStatus.forEach(card => {
            if (card.upturnedCard) {
              card.upturnedCard = false
              card.fixedUpturnedCard = true
            }
          })

          setUpturnedCardsCount(0)
        }

        if (firstUpturnedCard.cardIndex !== secondUpturnedCard.cardIndex) {
          setTimeout(() => {
            newCardStatus.forEach(card => {
              card.upturnedCard = false
            })

            setUpturnedCardsCount(0)
          }, 1000)
        }

        setMoveCount(moveCount => moveCount + 1)
        setCardStatus(newCardStatus)
      }
    }
  }, [upturnedCardsCount])

  const clearCardStatus = () => {
    const newCardStatus: CardStatus[] = []

    for (let i = 0; i < cards.length * 2; i++) {
      newCardStatus.push({
        cardIndex: null,
        upturnedCard: false,
        fixedUpturnedCard: false
      })
    }

    return newCardStatus
  }

  const shuffleCards = () => {
    const newCardStatus = clearCardStatus()

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < cards.length; j++) {
        let position = -1

        while (position < 0 || newCardStatus[position].cardIndex !== null) {
          position = Math.floor(Math.random() * (cards.length * 2))
        }

        newCardStatus[position].cardIndex = j
      }
    }

    setCardStatus(newCardStatus)
  }

  const resetGameGrid = () => {
    setTimeElapsed(0)
    setMoveCount(0)
    setUpturnedCardsCount(0)

    shuffleCards()
    setPlaying(true)
  }

  const handleItemClick = (index: number) => {
    if (playing && index !== null && upturnedCardsCount < 2) {
      const newCardStatus = [...cardStatus]

      if (newCardStatus[index].upturnedCard === false && newCardStatus[index].fixedUpturnedCard === false) {
        newCardStatus[index].upturnedCard = true
        setUpturnedCardsCount(upturnedCardsCount + 1)
      }

      setCardStatus(newCardStatus)
    }
  }

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="">
          <C.Logo src={logoImage} alt="logo devMemory" />
        </C.LogoLink>

        <C.InfoArea>
          <GameInfoItem label='Tempo' value={formatTimeElapsed(timeElapsed)} />
          <GameInfoItem label='Movimentos' value={moveCount.toString()} />
        </C.InfoArea>

        <Button label='Reiniciar' icon={restartIcon} onClick={resetGameGrid} />
      </C.Info>

      <C.GridArea>
        <C.Grid>
          {cardStatus.map((card, index) => (
            <CardItem
              key={index}
              card={card}
              onClick={() => handleItemClick(index)} />
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container >
  )
}

export default App;
