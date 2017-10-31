import styled from 'styled-components'

const CheckableOption = styled.button`
  border: 0;
  background-color: transparent;
  font-size: 30px;
  padding: 0;
  color: ${({ selected }) => (selected ? 'black' : 'lightgrey')};
  @media (max-width: 720px) {
    font-size: 25px;
    height: 40px;
  }
  @media (max-width: 320px) {
    font-size: 20px;
  }
  :hover {
    text-shadow: 1px 1px 5px black;
  }
  :disabled {
    text-shadow: none;
    color: lightgrey;
  }
`

export default CheckableOption
