import styled from "styled-components";

type Record = {
  record: boolean
}

export const Container = styled.div`
  margin: 20px 0;

  @media (max-width: 550px) {
    margin: 15px 0;
  }
`

export const Label = styled.div`
  font-size: 20px;
  color: #6A7D8B;

  @media (max-width: 550px) {
    font-size: 13px;
  }
`

export const Value = styled.div<Record>`
  font-size: ${({ record }) => record ? '20px' : '43px'};
  font-weight: bold;
  color: #101C40;

  @media (max-width: 550px) {
    font-size: ${({ record }) => record ? '12px' : '30px'}
  }

`