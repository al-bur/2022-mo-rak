import styled from '@emotion/styled';

const StyledFeatureIntroductionSection = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  scroll-snap-align: start;
`;

const StyledIntroductionTitleContainer = styled.div`
  margin-bottom: 8rem;
`;

const StyledTitle = styled.h1(
  ({ theme }) => `
  font-size: 4rem;
  text-align: left;
  color: ${theme.colors.BLACK_100};
  margin-bottom: 1.2rem;
  position: relative;
  font-weight: 700;
  line-height: 4.4rem;
  letter-spacing: 0.4rem
`
);

const StyledSubTitle = styled.div(
  ({ theme }) => `
  font-size: 2rem;
  text-align: left;
  color: ${theme.colors.BLACK_100};
  letter-spacing: 0.1rem; 
  line-height: 2.4rem;
`
);

const StyledFeatureContainer = styled.div`
  display: flex;
  gap: 4rem;
`;

const StyledFeatureCircle = styled.div(
  ({ theme }) => `
  position: relative;
  border-radius: 100%;
  width: 26rem;
  height: 26rem;
  background: ${theme.colors.YELLOW_100};
  margin-bottom: 1.2rem;
  display: flex;
  justify-content: center;
`
);

const StyledHighlightImage = styled.img`
  position: absolute;
  top: 1.2rem;
  left: -4rem;
  width: 5.2rem;
  height: 5.6rem;
`;

const StyledFeatureName = styled.div`
  text-align: center;
  font-size: 2rem;
`;

const StyledGlitterImage = styled.img`
  position: absolute;
  bottom: -2rem;
  right: -1.2rem;
  width: 4rem;
`;

const StyledPollImage = styled.img`
  width: 12rem;
`;

const StyledAppointmentImage = styled.img`
  width: 12rem;
`;

const StyledUndefinedImage = styled.img`
  width: 12rem;
`;

export {
  StyledAppointmentImage,
  StyledFeatureCircle,
  StyledFeatureContainer,
  StyledFeatureIntroductionSection,
  StyledFeatureName,
  StyledGlitterImage,
  StyledUndefinedImage,
  StyledPollImage,
  StyledHighlightImage,
  StyledSubTitle,
  StyledTitle,
  StyledIntroductionTitleContainer
};