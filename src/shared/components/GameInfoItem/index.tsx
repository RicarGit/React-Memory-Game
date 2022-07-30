import * as C from "./styles";
import { ThemeProps } from "types/ThemeProps"

type Props = {
  label: string
  value: string
  record: boolean
  currentTheme: ThemeProps
  children?: React.ReactElement
}

export const GameInfoItem = ({ label, value, record, children, currentTheme }: Props) => {
  return (
    <C.Container currentTheme={currentTheme}>
      <C.Label currentTheme={currentTheme}>{label}</C.Label>
      <C.Value currentTheme={currentTheme} record={record}>{value || children}</C.Value>
    </C.Container>
  )
}