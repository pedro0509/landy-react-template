import styled from "styled-components";

export const MiddleBlockSection = styled("section")`
  position: relative;
  padding: 7.5rem 0 3rem;
  text-align: center;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 1024px) {
    padding: 5.5rem 0 3rem;
  }

  h6 {
    color: #1f2e4A;
  }

  button {
    max-width: 350px;
    width: 100%;
    background-color: #D4a93c;
    color: #1f2e4A;
    border: 1px solid #D4a93c;
    border-radius: 8px;
    font-size: 1.125rem;
    padding: 16px 0;
    font-weight: bold;
    margin-top: 1.5rem;
    transition: all 0.3s ease-in-out;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);

    &:hover,
    &:active,
    &:focus {
      background-color: #1f2e4A;
      color: #fff;
      border: 1px solid #1f2e4A;
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0,0,0,0.15);
    }
  }
`;

export const Content = styled("p")`
  padding: 0.75rem 0 0.75rem;
  color: #1f2e4A;
`;

export const ContentWrapper = styled("div")`
  max-width: 1200px;

  @media only screen and (max-width: 768px) {
    max-width: 100%;
  }
`;
