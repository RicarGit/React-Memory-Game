import styled from "styled-components/macro";
import { ThemeProps } from "types/ThemeProps"

type ContainerProps = {
  showBackground: boolean
  showBorder: boolean
  currentTheme: ThemeProps
  flip: boolean
}

export const Container = styled.div<ContainerProps>`
  height: 120px;
  width: 120px;
  box-sizing: border-box;
  border: ${({ showBorder, theme, currentTheme }) => showBorder
    ? theme[currentTheme].frontBorder
    : theme[currentTheme].backBorder
  };
  border-radius: 20px;
  box-shadow: ${({ theme, currentTheme }) => currentTheme === 'dark' && theme[currentTheme].boxShadow};
  background-color: ${({ showBackground, theme, currentTheme }) => showBackground && theme[currentTheme].background};
  display: flex;
  justify-content: center;
  align-items: center;
  transform: ${({ flip }) => flip ? 'rotateY(-180deg)' : 'rotateY(0deg)'};
  transition: all linear .12s;
  cursor: pointer;
  
  @media (max-width: 550px) {
    height: 75px;
    width: 75px;
  }
`

export const Icon = styled.img`
  height: 50px;
  width: 50px;

  @media (max-width: 550px) {
    height: 40px;
    width: 40px;
  }
`