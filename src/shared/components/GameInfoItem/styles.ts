import styled from "styled-components/macro";
import { ThemeProps } from "types/ThemeProps"

type Record = {
  record?: boolean
  currentTheme: ThemeProps
}

export const Container = styled.div<Record>`
  margin: 20px 0;
  padding: 5px;
  box-shadow: ${({ theme, currentTheme }) => theme[currentTheme].boxShadow};
  background-color: ${({ theme, currentTheme }) => theme[currentTheme].background};
  text-align: ${({ theme, currentTheme }) => theme[currentTheme].alignCenter};
  border-radius: 18px;
  transition: all ease .5s;

  @media (max-width: 550px) {
    margin: 15px 0;
  }
`

export const Label = styled.div<Record>`
  font-size: 20px;
  color: ${({ theme, currentTheme }) => theme[currentTheme].infoLabel};


  @media (max-width: 550px) {
    font-size: 13px;
  }
`

export const Value = styled.div<Record>`
  font-size: ${({ record }) => record ? '20px' : '43px'};
  font-weight: bold;
  color: ${({ theme, currentTheme }) => theme[currentTheme].infoValue};

  @media (max-width: 550px) {
    font-size: ${({ record }) => record ? '12px' : '30px'}
  }

`