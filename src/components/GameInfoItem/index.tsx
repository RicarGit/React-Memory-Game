import * as C from "./styles";

type Props = {
  label: string
  value: string
}

export const GameInfoItem = ({ label, value }: Props) => {
  return (
    <C.Container>
      <C.Label>{label}</C.Label>
      <C.Value>{value}</C.Value>
    </C.Container>
  )
}