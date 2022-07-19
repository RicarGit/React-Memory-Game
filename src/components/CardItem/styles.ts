import styled from "styled-components";

export const Container = styled.div`
  height: 120px;
  width: 120px;
  border-radius: 20px;
  background-color: #1550FF;
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