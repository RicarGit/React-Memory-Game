import styled from "styled-components/macro";

type ContainerProps = {
  showBackground: boolean
  showBorder: boolean
  flip: boolean
}

export const Container = styled.div<ContainerProps>`
  height: 120px;
  width: 120px;
  box-sizing: border-box;
  border: ${props => props.showBorder ? '4px solid #1550FF' : '3px solid #000'};
  border-radius: 20px;
  background-color: ${props => props.showBackground && '#fff'};
  display: flex;
  justify-content: center;
  align-items: center;
  transform: ${props => props.flip ? 'rotateY(-180deg)' : 'rotateY(0deg)'};
  transition: .1s linear;
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