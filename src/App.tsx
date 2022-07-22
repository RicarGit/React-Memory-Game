import { useCallback, useEffect, useState } from 'react'

import * as C from './App.styles'
import logoImage from './assets/devmemory_logo.png'
import restartIcon from './svgs/restart.svg'

import { GameInfoItem } from './components/GameInfoItem'
import { CardItem } from './components/CardItem'
import { Button } from './components/Button'

import { CardStatus } from './types/CardStatus'

import { cards } from './utils/cards'
import { formatTimeElapsed } from './utils/formatTimeElapsed'

const App = () => {
  const [playing, setPlaying] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [moveCount, setMoveCount] = useState(0)
  const [upturnedCardsCount, setUpturnedCardsCount] = useState(0)
  const [record, setRecord] = useState<number[]>([])
  const [cardStatus, setCardStatus] = useState<CardStatus[]>([])

  useEffect(() => {
    const recordJson = localStorage.getItem('record')

    if (recordJson) {
      const currentRecord = JSON.parse(recordJson)
      setRecord(currentRecord)
    }
  }, [])

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
          setCardStatus(newCardStatus)
        }

        if (firstUpturnedCard.cardIndex !== secondUpturnedCard.cardIndex) {
          setTimeout(() => {
            newCardStatus.forEach(card => {
              card.upturnedCard = false
            })

            setUpturnedCardsCount(0)
            setCardStatus(newCardStatus)
          }, 1000)
        }

        setMoveCount(moveCount => moveCount + 1)
      }
    }
  }, [upturnedCardsCount, cardStatus])

  useEffect(() => {
    if (moveCount > 0 && cardStatus.every(card => card.fixedUpturnedCard === true)) {
      const recordJson = localStorage.getItem('record')

      if (recordJson) {
        const record = JSON.parse(recordJson)
        const [timeElapsedRecord, moveCountRecord] = record

        if (moveCount <= moveCountRecord && timeElapsed <= timeElapsedRecord) {
          setRecord([timeElapsed, moveCount])
        }
      }

      localStorage.setItem("record", JSON.stringify([timeElapsed, moveCount]))
      setPlaying(false)
    }
  }, [moveCount, timeElapsed, cardStatus])

  const clearCardStatus = useCallback(() => {
    const newCardStatus: CardStatus[] = []

    for (let i = 0; i < cards.length * 2; i++) {
      newCardStatus.push({
        cardIndex: null,
        upturnedCard: false,
        fixedUpturnedCard: false
      })
    }

    return newCardStatus
  }, [])

  const shuffleCards = useCallback(() => {
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
  }, [clearCardStatus])

  const resetGameGrid = useCallback(() => {
    setTimeElapsed(0)
    setMoveCount(0)
    setUpturnedCardsCount(0)

    shuffleCards()
    setPlaying(true)
  }, [shuffleCards])

  const handleItemClick = useCallback((index: number) => {
    if (playing && index !== null && upturnedCardsCount < 2) {
      const newCardStatus = [...cardStatus]

      if (newCardStatus[index].upturnedCard === false && newCardStatus[index].fixedUpturnedCard === false) {
        newCardStatus[index].upturnedCard = true
        setUpturnedCardsCount(upturnedCardsCount + 1)
      }

      setCardStatus(newCardStatus)
    }
  }, [cardStatus, playing, upturnedCardsCount])

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="">
          <C.Logo src={logoImage} alt="logo devMemory" />
        </C.LogoLink>

        <C.InfoArea>
          <GameInfoItem label='Tempo' record={false} value={formatTimeElapsed(timeElapsed) || '00:00'} />
          <GameInfoItem label='Movimentos' record={false} value={moveCount.toString()} />
          <GameInfoItem label='Recorde' record={true} value={''}>
            <>
              {`Tempo: ${formatTimeElapsed(record[0])}`}
              <br />
              {`Movimentos: ${record[1] || 0}`}
            </>
          </GameInfoItem>
        </C.InfoArea>

        <Button label={playing ? 'Reiniciar' : 'Iniciar Jogo'} icon={playing ? restartIcon : ''} onClick={resetGameGrid} />
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
