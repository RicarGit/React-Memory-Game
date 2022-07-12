import * as C from './App.styles'
import logoImage from './assets/devmemory_logo.png'
import restartIcon from './svgs/restart.svg'
import { GameInfoItem } from './components/GameInfoItem'
import { Button } from './components/Button'

const App = () => {
  const resetAndCreateGameGrid = () => {

  }

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="">
          <C.Logo src={logoImage} alt="logo devMemory" />
        </C.LogoLink>

        <C.InfoArea>
          <GameInfoItem label='Tempo' value='00:00' />
          <GameInfoItem label='Movimentos' value='0' />
        </C.InfoArea>

        <Button label='Reiniciar' icon={restartIcon} onClick={resetAndCreateGameGrid} />
      </C.Info>
      <C.GridArea>
        ...
      </C.GridArea>
    </C.Container >
  )
}

export default App;
