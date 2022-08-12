import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Box from '../../common/Box/Box';
import Divider from '../../common/Divider/Divider';
import FlexContainer from '../../common/FlexContainer/FlexContainer';
import MarginContainer from '../../common/MarginContainer/MarginContainer';

import PollResultItemGroup from '../PollResultItemGroup/PollResultItemGroup';
import PollResultDetail from '../PollResultDetail/PollResultDetail';
import PollResultButtonGroup from '../PollResultButtonGroup/PollResultButtonGroup';
import { getPoll, getPollResult } from '../../../api/poll';
import { PollInterface, getPollResponse, getPollResultResponse } from '../../../types/poll';
import { GroupInterface } from '../../../types/group';

import PollResultProgress from '../PollResultProgress/PollResultProgress';
import PollResultStatus from '../PollResultStatus/PollResultStatus';
import PollResultShareLink from '../PollResultShareLink/PollResultShareLink';

function PollResultContainer() {
  const { groupCode, pollCode } = useParams() as {
    groupCode: GroupInterface['code'];
    pollCode: PollInterface['code'];
  };
  const poll = useQuery(['poll', pollCode, groupCode], () => getPoll(pollCode, groupCode));
  const pollResult = useQuery(['pollResult', pollCode, groupCode], () =>
    getPollResult(pollCode, groupCode));

  // if (poll.isLoading || pollResult.isLoading) return <div>로딩중</div>;
  if (!poll.isSuccess || !pollResult.isSuccess) return <div>로딩중</div>;

  return (
    <Box width="84.4rem" padding="2rem 4.8rem 5.6rem">
      {poll ? (
        <>
          <FlexContainer justifyContent="end">
            <MarginContainer margin="0 0 1.4rem 0">
              <FlexContainer gap="1.2rem" alignItems="center">
                <PollResultShareLink pollCode={pollCode} />
                <PollResultStatus status={poll.data.status} />
              </FlexContainer>
            </MarginContainer>
          </FlexContainer>
          <MarginContainer margin="0 0 1.4rem 0">
            <StyledTitle>{poll.data.title}</StyledTitle>
            <Divider />
          </MarginContainer>
          <MarginContainer margin="1.4rem 0">
            <PollResultProgress pollResult={pollResult.data} groupCode={groupCode} />
          </MarginContainer>
          <MarginContainer margin="1.4rem 0">
            <PollResultDetail
              isAnonymous={poll.data.isAnonymous}
              allowedPollCount={poll.data.allowedPollCount}
            />
          </MarginContainer>
          <MarginContainer margin="0 0 4rem 0">
            <FlexContainer flexDirection="column" gap="1.2rem">
              <PollResultItemGroup
                status={poll.data.status}
                pollCode={poll.data.code}
                groupCode={groupCode}
                pollResult={pollResult.data}
              />
            </FlexContainer>
          </MarginContainer>
          <PollResultButtonGroup
            isHost={poll.data.isHost}
            status={poll.data.status}
            pollCode={poll.data.code}
            groupCode={groupCode}
          />
        </>
      ) : (
        <div>로딩중</div>
      )}
    </Box>
  );
}

const StyledTitle = styled.h1(
  ({ theme }) => `
  color: ${theme.colors.BLACK_100};
  font-size: 3.2rem;
`
);

export default PollResultContainer;
