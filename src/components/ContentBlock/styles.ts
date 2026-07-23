import { Row } from "antd";
import styled from "styled-components";

export const ContentSection = styled("section")`
  position: relative;
  padding: 10rem 0 8rem;

  @media only screen and (max-width: 1024px) {
    padding: 4rem 0 4rem;
  }
`;

export const Content = styled("p")`
  margin: 1.5rem 0 2rem 0;
`;

export const StyledRow = styled(Row)`
  flex-direction: ${({ direction }: { direction: string }) =>
    direction === "left" ? "row" : "row-reverse"};
`;

export const ContentWrapper = styled("div")`
  position: relative;
  max-width: 540px;

  @media only screen and (max-width: 575px) {
    padding-top: 4rem;
  }
`;

export const ServiceWrapper = styled("div")`
  display: flex;
  justify-content: space-between;
  max-width: 100%;
  align-items: stretch;
  gap: 0.5rem;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ServiceItem = styled("div")`
  flex: 1;
  text-align: center;
  background-color: #f5f5f5;
  padding: 1rem 0.5rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const Arrow = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.25rem;
  font-size: 1.5rem;
  color: #1f2e4A;
  font-weight: bold;

  @media only screen and (max-width: 768px) {
    transform: rotate(90deg);
    padding: 0.5rem 0;
  }
`;

export const MinTitle = styled("h6")`
  font-size: 15px;
  line-height: 1rem;
  padding: 0.5rem 0;
  text-transform: uppercase;
  color: #1f2e4A;
  font-family: "Motiva Sans Light", sans-serif;
`;

export const MinPara = styled("p")`
  font-size: 13px;
`;

export const ButtonWrapper = styled("div")`
  display: flex;
  justify-content: space-between;
  max-width: 100%;

  @media screen and (min-width: 1024px) {
    max-width: 80%;
  }

  button:last-child {
    margin-left: 20px;
  }
`;

export const AlertBox = styled("div")`
  margin-top: 2rem;
  background-color: #e8f5e9;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid #c8e6c9;
`;

export const AlertTitle = styled("h6")`
  color: #2e7d32;
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

export const AlertContent = styled("p")`
  color: #1b5e20;
  font-size: 0.9rem;
  margin: 0;
`;
