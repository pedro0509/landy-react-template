import styled from "styled-components";
import { Link } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";

export const HeaderSection = styled("header") <{ isScrolled?: boolean }>`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  background-color: ${({ isScrolled }) => (isScrolled ? "#fafafa" : "rgba(250, 250, 250, 0.6)")};
  box-shadow: ${({ isScrolled }) => (isScrolled ? "0 2px 10px rgba(0, 0, 0, 0.1)" : "0 2px 10px rgba(0, 0, 0, 0)")};
  padding: ${({ isScrolled }) => (isScrolled ? "0rem 0.5rem" : "0rem 0.5rem")};
  transition: all 0.3s ease-in-out;

  .ant-row-space-between {
    align-items: center;
    text-align: center;
  }
`;

export const LogoContainer = styled(Link)`
  display: flex;
`;

export const LogoTitle = styled("h1")`
  font-family: 'Motiva Sans Bold', serif;
  color: #091f36;
  font-size: 24px;
  margin-left: 10px;
  align-self: center;
  margin-bottom: 0;
  
  @media only screen and (max-width: 414px) {
    font-size: 18px;
  }
`;

export const NavLink = styled("div")`
  display: inline-block;
  text-align: center;
`;

export const CustomNavLink = styled("div")`
  width: 203px;
  display: inline-block;

  @media only screen and (max-width: 411px) {
    width: 150px;
  }

  @media only screen and (max-width: 320px) {
    width: 118px;
  }
`;

export const Burger = styled("div")`
  @media only screen and (max-width: 890px) {
    display: block;
  }

  display: none;

  svg {
    fill: #091f36;
  }
`;

export const NotHidden = styled("div")`
  @media only screen and (max-width: 890px) {
    display: none;
  }
`;

export const Menu = styled("h5")`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`;

export const CustomNavLinkSmall = styled(NavLink)`
  font-size: 1.2rem;
  color: #091f36;
  transition: color 0.2s ease-in;
  margin: 0.5rem 2rem;

  @media only screen and (max-width: 768px) {
    margin: 1.25rem 2rem;
  }
`;

export const Label = styled("span")`
  font-weight: 500;
  color: #404041;
  text-align: right;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export const Outline = styled(MenuOutlined)`
  font-size: 22px;
`;

export const Span = styled("span")`
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover,
  &:active,
  &:focus {
    color: #ffa600;
  }
`;
