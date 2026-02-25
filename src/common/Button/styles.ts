import styled from "styled-components";

export const StyledButton = styled("button") <{ color?: string }>`
  background: ${(p) => p.color || "#091f36"};
  color: ${(p) => (p.color ? "#091f36" : "#fff")};
  font-size: 1rem;
  font-weight: 700;
  width: 100%;
  border: 1px solid #edf3f5;
  border-radius: 4px;
  padding: 13px 0;
  cursor: pointer;
  margin-top: 0.625rem;
  max-width: 180px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 16px 30px rgb(9 31 54 / 20%);

  &:hover,
  &:active,
  &:focus {
    color: #fff;
    border: 1px solid #ffa600;
    background-color: #ffa600;
  }
`;
