import { lazy } from "react";
import styled from "styled-components";
import IntroContent from "../../content/IntroContent.json";
import MiddleBlockContent from "../../content/MiddleBlockContent.json";
import AboutContent from "../../content/AboutContent.json";
import MissionContent from "../../content/MissionContent.json";
import ContactContent from "../../content/ContactContent.json";

const Contact = lazy(() => import("../../components/ContactForm"));
const MiddleBlock = lazy(() => import("../../components/MiddleBlock"));
const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));

const IntroBackground = styled.section`
  background: linear-gradient(rgba(25, 36, 29, 0.8), rgba(25, 36, 29, 0.8)), url('/img/hero-bg.jpg') center center no-repeat;
  background-size: cover;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;

  h6, p {
    color: #fafafa;
  }
`;

const Home = () => {
  return (
    <>
      <ScrollToTop />
      <IntroBackground>
        <Container>
          <ContentBlock
            direction="left"
            title={IntroContent.title}
            content={IntroContent.text}
            button={IntroContent.button}
            id="section1"
          />
        </Container>
      </IntroBackground>
      <Container>
        <MiddleBlock
          title={MiddleBlockContent.title}
          content={MiddleBlockContent.text}
          button={MiddleBlockContent.button}
          id="call-one"
        />
        <ContentBlock
          direction="left"
          title={AboutContent.title}
          content={AboutContent.text}
          section={AboutContent.section}
          icon="graphs.svg"
          id="how-it-works"
        />
        <ContentBlock
          direction="left"
          title={AboutContent.title}
          content={AboutContent.text}
          section={AboutContent.section}
          icon="graphs.svg"
          id="about"
        />
        <ContentBlock
          direction="right"
          title={MissionContent.title}
          content={MissionContent.text}
          icon="product-launch.svg"
          id="support"
        />
        <Contact
          title={ContactContent.title}
          content={ContactContent.text}
          id="contact"
        />
      </Container>
    </>
  );
};

export default Home;
