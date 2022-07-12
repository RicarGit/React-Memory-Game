import * as C from './App.styles'
import logoImage from './assets/devmemory_logo.png'
import { GameInfoItem } from './components/GameInfoItem'

const App = () => {
  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="">
          <img src={logoImage} width="200" alt="" />
        </C.LogoLink>

        <C.InfoArea>
          <GameInfoItem label='Tempo' value='00:00' />
          <GameInfoItem label='Movimentos' value='0' />
        </C.InfoArea>

        <button>Reiniciar</button>
      </C.Info>
      <C.GridArea>
        ...
      </C.GridArea>
    </C.Container >
  )
}

export default App;
