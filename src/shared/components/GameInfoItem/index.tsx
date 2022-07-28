import * as C from "./styles";

type Props = {
  label: string
  value: string
  record: boolean
  children?: React.ReactElement
}

export const GameInfoItem = ({ label, value, record, children }: Props) => {
  return (
    <C.Container>
      <C.Label>{label}</C.Label>
      <C.Value record={record}>{value || children}</C.Value>
    </C.Container>
  )
}