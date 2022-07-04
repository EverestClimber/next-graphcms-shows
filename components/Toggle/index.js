import styled from "styled-components";

const SwitchInput = styled.input`
  display: none;
`;

const Container = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 25px;

  ${({ checked }) =>
    !checked &&
    `
    box-sizing: content-box;
    border-radius: 25px;
    border: 1px solid #E2E1E1;
  `}
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-transition: background-color 0.2s ease;
  transition: background-color 0.2s ease;
  background-color: white;
  border-radius: 25px;

  &:before {
    position: absolute;
    content: "";
    height: 21px;
    width: 21px;
    left: 2px;
    bottom: 2px;
    background-color: grey;
    -webkit-transition: transform 0.3s ease;
    transition: transform 0.3s ease;
    border-radius: 50%;
  }

  ${SwitchInput}:checked + &:before {
    -webkit-transform: translateX(25px);
    -ms-transform: translateX(25px);
    transform: translateX(25px);
    background-color: #de3244;
  }
`;

export const Toggle = ({ toggled, onToggle }) => (
  <Container checked={toggled}>
    <SwitchInput type="checkbox" checked={toggled} onChange={onToggle} />
    <Slider />
  </Container>
);
