import styled from "styled-components/macro"
import { ThemeProps } from "types/ThemeProps"

type Wrapper = {
  currentTheme: ThemeProps
}

export const BgWrapper = styled.div<Wrapper>`
  height: 100vh;
  background: ${({ theme, currentTheme }) => theme[currentTheme].background};
`

export const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  margin: 0 auto;
  padding-top: 50px;

  @media (max-width: 1030px) {
    width: auto;
    margin: 0 20px;
    padding-top: 40px;
  }
 
  @media (max-width: 750px) {
    flex-direction: column;
  }

  @media (max-width: 550px) {
    margin: 0 auto;
    padding-top: 15px;
  }
`

type InfoTheme = {
  currentTheme: ThemeProps
}

export const Info = styled.div<InfoTheme>`
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: ${({ theme, currentTheme }) => currentTheme === 'dark' && theme[currentTheme].alignCenter};

  @media (max-width: 750px) {
    margin-bottom: 50px;
    align-items: center;
  }

  @media (max-width: 550px) {
    margin-bottom: 20px;
  }
`

export const LogoLink = styled.a`
  display: block;
`

export const Logo = styled.img`
  width: 200px;
`

export const ThemeIcon = styled.img`
  width: 37px;
  padding: 0 12px;
`

export const InfoArea = styled.div`
  width: 100%;
  margin: 10px 0;

  @media (max-width: 750px) {
    display: flex;
    justify-content: space-around;
    text-align: center;
  }

  @media (max-width: 550px) {
    justify-content: space-evenly;
    margin: 0;
  }
`

export const GridArea = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 750px) {
    justify-content: center;
    margin: 0 20px;
  }
`

export const Grid = styled.div`
  width: inherit;
  display: grid;
  position: relative;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  animation: opacity 1.5s ease-in-out;

  @keyframes opacity {
    0% {
      left: 150px;
      opacity: 0;
    }
    100% {
      left: 0;
      opacity: 1;
    }
  }

    @media (max-width: 900px) {
    grid-template-columns: repeat(4, 1fr);
  }

    @media (max-width: 550px) {
    gap: 5px;
  }
`