import { ThemeIcon } from './styles'
import { ThemeProps } from 'types/ThemeProps'

import themeIconBright from 'assets/brightness.png'
import themeIconBlack from 'assets/blackness.png'
import { MouseEvent } from 'react'

type ButtonTheme = {
  currentTheme: ThemeProps
  setTheme: React.Dispatch<React.SetStateAction<ThemeProps>>
}

export const ThemeButton = ({ currentTheme, setTheme }: ButtonTheme) => {
  const handleThemeClick = (e: MouseEvent) => {
    e.preventDefault()

    setTheme(prevTheme => {
      if (prevTheme === 'light') {
        localStorage.setItem('theme', 'dark')
        return 'dark'
      }

      localStorage.setItem('theme', 'false')
      return 'light'
    })
  }

  return (
    <ThemeIcon src={currentTheme === 'dark' ? themeIconBlack : themeIconBright} onClick={handleThemeClick} />
  )
}