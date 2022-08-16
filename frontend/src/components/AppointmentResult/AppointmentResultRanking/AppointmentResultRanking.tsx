import React, { MouseEventHandler, useState, useEffect } from 'react';
import styled from '@emotion/styled';

import Crown from '../../../assets/crown.svg';
import { AppointmentRecommendationInterface } from '../../../types/appointment';
import { GroupInterface, MemberInterface } from '../../../types/group';
import { getGroupMembers } from '../../../api/group';
import FlexContainer from '../../@common/FlexContainer/FlexContainer';

const getDateTime = (
  recommendationDateTime: AppointmentRecommendationInterface[
    | 'recommendStartDateTime'
    | 'recommendEndDateTime']
) => {
  // TODO: 리팩토링
  const period = recommendationDateTime.slice(-2);
  const dateTime = new Date(recommendationDateTime.slice(0, -2));
  const week = ['일', '월', '화', '수', '목', '금', '토'];

  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1;
  const date = dateTime.getDate();
  const day = week[dateTime.getDay()];
  const hour = dateTime.getHours().toString().padStart(2, '0');
  const minutes = dateTime.getMinutes().toString().padStart(2, '0');

  return ` ${year}.${month}.${date}(${day}) ${hour}:${minutes}${period} `;
};

interface Props {
  groupCode: GroupInterface['code'];
  appointmentRecommendation: Array<AppointmentRecommendationInterface>;
  clickedRecommendation: number;
  onClickRank: (idx: number) => MouseEventHandler<HTMLDivElement>;
}

function AppointmentResultRanking({
  groupCode,
  appointmentRecommendation,
  clickedRecommendation,
  onClickRank
}: Props) {
  const [groupMembers, setGroupMembers] = useState<Array<MemberInterface>>([]);
  const totalParticipants = groupMembers.length;

  useEffect(() => {
    const fetchGroupMembers = async () => {
      try {
        if (groupCode) {
          const res = await getGroupMembers(groupCode);
          setGroupMembers(res.data);
        }
      } catch (err) {
        if (err instanceof Error) {
          console.log(err);
        }
      }
    };
    fetchGroupMembers();
  }, [groupCode]);

  return (
    <StyledResultBox>
      {appointmentRecommendation.map(
        (
          // TODO: destructuring에 관하여 일관성 살펴보기
          {
            rank,
            recommendStartDateTime,
            recommendEndDateTime,
            availableMembers
          }: AppointmentRecommendationInterface,
          idx
        ) => (
          <StyledRank onClick={onClickRank(idx)} isClicked={idx === clickedRecommendation}>
            <FlexContainer justifyContent="space-between">
              {/* TODO: 상수화 */}
              {rank === 1 ? (
                <StyledCrownIcon src={Crown} alt="crown" />
              ) : (
                // TODO: Text라는 suffix에 대해서 일관성 살펴보기
                <StyledResultText>{rank}</StyledResultText>
              )}
              <StyledResultText>
                {getDateTime(recommendStartDateTime)}~{getDateTime(recommendEndDateTime)}
              </StyledResultText>
              <StyledResultText>
                {availableMembers.length}/{totalParticipants}명 가능
              </StyledResultText>
            </FlexContainer>
          </StyledRank>
        )
      )}
    </StyledResultBox>
  );
}

const StyledResultBox = styled.div(
  ({ theme }) => `
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  width: 78rem; 
  height: 59.6rem;
  overflow-y: auto;
  border-radius: 15px;
  padding: 2rem 0;
  
  background-color: ${theme.colors.WHITE_100};
  box-shadow: 0px 4px 4px ${theme.colors.TRANSPARENT_BLACK_100_25};
`
);

const StyledResultText = styled.span`
  font-size: 2rem;
`;

const StyledCrownIcon = styled.img`
  width: 2rem;
`;

const StyledRank = styled.div<{
  isClicked: boolean;
}>(
  // NOTE: 아래처럼 변수 사용하는 것은 밑으로 빼줘도 괜찮을듯?
  ({ theme, isClicked }) => `
  text-align: center;
  width: 66.8rem;
  border-radius: 0.8rem;
  padding: 2rem 4.4rem;
  cursor: pointer;
  
  border: 0.1rem solid ${theme.colors.TRANSPARENT_BLACK_100_25};
  box-shadow: 0px 4px 4px ${theme.colors.TRANSPARENT_BLACK_100_25};
  background-color: ${isClicked ? theme.colors.PURPLE_100 : theme.colors.WHITE_100};
  color: ${isClicked ? theme.colors.WHITE_100 : theme.colors.BLACK_100};
`
);

export default AppointmentResultRanking;