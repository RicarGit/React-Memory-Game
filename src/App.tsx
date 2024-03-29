import { useCallback, useEffect, useRef, useState } from 'react'

import * as C from './App.styles'
import logoImage from './assets/devmemory_logo.png'
import darkLogoImage from './assets/devmemory_logo_dark_mode.png'
import restartIcon from './assets/svgs/restart.svg'
import darkRestartIcon from './assets/svgs/restartDark.svg'

import { GameInfoItem } from './shared/components/GameInfoItem'
import { CardItem } from './shared/components/CardItem'
import { Button } from './shared/components/Button'
import { ThemeButton } from 'shared/components/ThemeButton'

import { CardStatus } from './types/CardStatus'
import { ThemeProps } from './types/ThemeProps'

import { cards } from './shared/cards'
import { formatTimeElapsed } from './helpers/formatTimeElapsed'

const App = () => {
  const [playing, setPlaying] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [moveCount, setMoveCount] = useState(0)
  const [upturnedCardsCount, setUpturnedCardsCount] = useState(0)
  const [record, setRecord] = useState<number[]>([])
  const [theme, setTheme] = useState<ThemeProps>('light')
  const cardStatus = useRef<CardStatus[]>([])

  useEffect(() => {
    const storageTheme = localStorage.getItem('theme')

    if (storageTheme === 'light') {
      setTheme('light')
    }

    if (storageTheme === 'dark') {
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    const recordJson = localStorage.getItem('record')

    if (recordJson) {
      const currentRecord = JSON.parse(recordJson)
      setRecord(currentRecord)
    }
  }, [playing])

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
      const upturnedCards = cardStatus.current.filter(card => card.upturnedCard)

      if (upturnedCards.length === 2) {
        const [firstUpturnedCard, secondUpturnedCard] = upturnedCards

        if (firstUpturnedCard.cardIndex === secondUpturnedCard.cardIndex) {
          cardStatus.current.forEach(card => {
            if (card.upturnedCard) {
              card.upturnedCard = false
              card.fixedUpturnedCard = true
            }
          })

          setUpturnedCardsCount(0)
        }

        if (firstUpturnedCard.cardIndex !== secondUpturnedCard.cardIndex) {
          setTimeout(() => {
            cardStatus.current.forEach(card => {
              card.upturnedCard = false
            })

            setUpturnedCardsCount(0)
          }, 1000)
        }

        setMoveCount(moveCount => moveCount + 1)
      }
    }
  }, [upturnedCardsCount])

  useEffect(() => {
    if (moveCount > 0 && cardStatus.current.every(card => card.fixedUpturnedCard === true)) {
      const recordJson = localStorage.getItem('record')

      if (recordJson) {
        const record = JSON.parse(recordJson)
        const [timeElapsedRecord, moveCountRecord] = record

        if (moveCount <= moveCountRecord && timeElapsed <= timeElapsedRecord) {
          localStorage.setItem("record", JSON.stringify([timeElapsed, moveCount]))
          setRecord([timeElapsed, moveCount])
        }

      } else {
        localStorage.setItem("record", JSON.stringify([timeElapsed, moveCount]))
      }

      setPlaying(false)
    }
  }, [moveCount, timeElapsed])

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

    cardStatus.current = newCardStatus
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

      if (cardStatus.current[index].upturnedCard === false && cardStatus.current[index].fixedUpturnedCard === false) {
        cardStatus.current[index].upturnedCard = true
        setUpturnedCardsCount(upturnedCardsCount => upturnedCardsCount + 1)
      }
    }
  }, [playing, upturnedCardsCount])

  return (
    <C.BgWrapper currentTheme={theme}>
      <C.Container>
        <C.Info currentTheme={theme}>
          <C.LogoLink href="">
            <C.Logo src={theme === 'dark' ? darkLogoImage : logoImage} alt="logo devMemory" />
            <ThemeButton currentTheme={theme} setTheme={setTheme} />
          </C.LogoLink>

          <C.InfoArea>
            <GameInfoItem label='Tempo' record={false} currentTheme={theme} value={formatTimeElapsed(timeElapsed) || '00:00'} />
            <GameInfoItem label='Movimentos' record={false} currentTheme={theme} value={`${moveCount}`} />
            <GameInfoItem label='Recorde' record={true} currentTheme={theme} value={''}>
              <>
                {`Tempo: ${formatTimeElapsed(record[0]) || '00:00'}`}
                <br />
                {`Movimentos: ${record[1] || 0}`}
              </>
            </GameInfoItem>
          </C.InfoArea>

          <Button
            label={playing ? 'Reiniciar' : 'Iniciar Jogo'}
            icon={
              (playing || '') &&
              (theme === 'light' ? restartIcon : darkRestartIcon)
            }
            currentTheme={theme}
            onClick={resetGameGrid} />
        </C.Info>

        <C.GridArea>
          <C.Grid>
            {cardStatus.current.map((card, index) => (
              <CardItem
                key={index}
                card={card}
                currentTheme={theme}
                onClick={() => handleItemClick(index)} />
            ))}
          </C.Grid>
        </C.GridArea>
      </C.Container >
    </C.BgWrapper>
  )
}

export default App