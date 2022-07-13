import * as C from './App.styles'
import logoImage from './assets/devmemory_logo.png'
import restartIcon from './svgs/restart.svg'
import { GameInfoItem } from './components/GameInfoItem'
import { Button } from './components/Button'

const App = () => {

  const [playing, setPlaying] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [moveCount, setMoveCount] = useState(0)
  const [upturnedCardsCount, setUpturnedCardsCount] = useState(0)
  const [cardStatus, setCardStatus] = useState<CardStatus[]>([])

  }

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="">
          <C.Logo src={logoImage} alt="logo devMemory" />
        </C.LogoLink>

        <C.InfoArea>
          <GameInfoItem label='Tempo' value={timeElapsed.toString()} />
          <GameInfoItem label='Movimentos' value={moveCount.toString()} />
        </C.InfoArea>

        <Button label='Reiniciar' icon={restartIcon} onClick={resetGameGrid} />
      </C.Info>

      <C.GridArea>
        <C.Grid>

        </C.Grid>
      </C.GridArea>
    </C.Container >
  )
}

export default App;
