import React from 'react'
import * as C from './styles'

import { ThemeProps } from "types/ThemeProps";

type Props = {
  label: string
  icon: string
  currentTheme: ThemeProps
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export const Button = ({ label, icon, onClick, currentTheme }: Props) => {
  return (
    <C.Container currentTheme={currentTheme} onClick={onClick}>
      {icon &&
        <C.IconArea>
          <C.Icon src={icon} />
        </C.IconArea>
      }
      <C.Label currentTheme={currentTheme}>{label}</C.Label>
    </C.Container>
  )
}