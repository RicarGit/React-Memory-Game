import styled from "styled-components";

type ContainerProps = {
  showBackground: boolean
  showBorder: boolean
}

export const Container = styled.div<ContainerProps>`
  height: 120px;
  width: 120px;
  box-sizing: border-box;
  border: ${props => props.showBorder ? 'none' : '2px solid #000'};
  border-radius: 20px;
  background-color: ${props => props.showBackground ? '#1550FF' : '$f00'};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @media (max-width: 550px) {
    height: 100px;
    width: 100px;
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