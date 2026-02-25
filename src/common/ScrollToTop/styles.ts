import styled from "styled-components";

export const ScrollUpContainer = styled("div") <{
  show: boolean;
}>`
  padding: 10px;
  position: fixed;
  right: 30px;
  bottom: 30px;
  z-index: 10;
  cursor: pointer;
  background: #E8CFA1;
  text-align: center;
  align-items: center;
  border-radius: 4px;
  transition: all 0.3s ease-in-out;
  visibility: ${(p) => (p.show ? "visible" : "hidden")};
  opacity: ${(p) => (p.show ? "1" : "0")};
  display: flex;

  &:hover,
  &:active,
  &:focus {
    background: #D4a93c;
  }

  @media screen and (max-width: 1240px) {
    display: none;
  }
`;
