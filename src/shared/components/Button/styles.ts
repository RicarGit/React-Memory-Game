import styled from "styled-components/macro";
import { ThemeProps } from "types/ThemeProps";

type buttonTheme = {
  currentTheme: ThemeProps
}

export const Container = styled.button<buttonTheme>`
  width: 200px;
  height: 50px;
  display: flex;
  background-color: ${({ theme, currentTheme }) => theme[currentTheme].buttonBg};
  border: none;
  border-radius: 10px;
  opacity: 1;
  transition: all ease .8s;
  box-shadow: ${({ theme, currentTheme }) => theme[currentTheme].boxShadow};

  &:hover {
    opacity: .8;
  }

  @media (max-width: 550px) {
    width: 150px;
    height: 35px;
  }
`

export const IconArea = styled.div`
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid rgba(255, 255, 255, .2);
  padding: 0 15px;

  @media (max-width: 550px) {
    padding: 0 10px;
  }
`

export const Icon = styled.img`
  height: 20px;

  @media (max-width: 550px) {
    height: 15px;
  }
`

export const Label = styled.span<buttonTheme>`
  height: inherit;
  color: ${({ theme, currentTheme }) => theme[currentTheme].buttonLabel};
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 0 20px;
`