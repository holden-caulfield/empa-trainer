import styled from 'styled-components'

export default styled.div`
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  padding: 60px 0px 20px 0px;
  overflow-y: scroll;
  width: 100%;
  align-items: center;
  @media (max-width: 400px) {
    padding-bottom: 10px;
    height: calc(100vh - 70px);
  }
`
