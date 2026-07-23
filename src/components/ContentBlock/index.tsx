import { Fragment } from "react";
import { Col } from "antd";
import { Slide } from "react-awesome-reveal";
// @ts-ignore: children prop not typed

import { withTranslation } from "react-i18next";

import { ContentBlockProps } from "./types";
import { Button } from "../../common/Button";
import { SvgIcon } from "../../common/SvgIcon";
// SvgIcon is used later, keep import
import {
  ContentSection,
  Content,
  ContentWrapper,
  ServiceWrapper,
  ServiceItem,
  Arrow,
  MinTitle,
  MinPara,
  StyledRow,
  ButtonWrapper,
  AlertBox,
  AlertTitle,
  AlertContent,
} from "./styles";

const ContentBlock = ({
  icon,
  image,
  title,
  content,
  section,
  button,
  t,
  id,
  direction,
  alertBox,
}: ContentBlockProps) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id) as HTMLDivElement;
    element.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <ContentSection>
      {/* @ts-ignore: children prop not typed */}
      <Slide direction="left" triggerOnce>
        <StyledRow
          justify="space-between"
          align="middle"
          id={id}
          direction={direction}
        >
          {image && (
            <Col lg={11} md={11} sm={12} xs={24}>
              <img src={image} alt="section" style={{ width: "100%", height: "auto", borderRadius: "8px" }} />
            </Col>
          )}
          {!image && icon && (
            <Col lg={11} md={11} sm={12} xs={24}>
              <SvgIcon src={icon} width="100%" height="100%" />
            </Col>
          )}
          <Col lg={(icon || image) ? 11 : 24} md={(icon || image) ? 11 : 24} sm={(icon || image) ? 11 : 24} xs={24}>
            <ContentWrapper>
              <h6>{t(title)}</h6>
              <Content dangerouslySetInnerHTML={{ __html: t(content) }} />
              {button && (
                <ButtonWrapper>
                  {typeof button === "object" &&
                    button.map(
                      (
                        item: {
                          color?: string;
                          title: string;
                        },
                        id: number
                      ) => {
                        return (
                          <Button
                            key={id}
                            color={item.color}
                            onClick={() => scrollTo("about")}
                          >
                            {t(item.title)}
                          </Button>
                        );
                      }
                    )}
                </ButtonWrapper>
              )}
              {section && (
                <ServiceWrapper>
                  {typeof section === "object" &&
                    section.map(
                      (
                        item: {
                          title: string;
                          content: string;
                          icon: string;
                        },
                        id: number
                      ) => {
                        return (
                          <Fragment key={id}>
                            <ServiceItem>
                              <SvgIcon
                                src={item.icon}
                                width="60px"
                                height="60px"
                              />
                              <MinTitle>{t(item.title)}</MinTitle>
                              <MinPara>{t(item.content)}</MinPara>
                            </ServiceItem>
                            {id < section.length - 1 && (
                              <Arrow>➔</Arrow>
                            )}
                          </Fragment>
                        );
                      }
                    )}
                </ServiceWrapper>
              )}
              {alertBox && (
                <AlertBox>
                  <AlertTitle>{t(alertBox.title)}</AlertTitle>
                  <AlertContent>{t(alertBox.content)}</AlertContent>
                </AlertBox>
              )}
            </ContentWrapper>
          </Col>
        </StyledRow>
      </Slide>
    </ContentSection>
  );
};

export default withTranslation()(ContentBlock);
