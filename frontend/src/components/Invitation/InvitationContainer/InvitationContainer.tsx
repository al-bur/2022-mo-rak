import React, { useEffect } from 'react';
import styled from '@emotion/styled';

import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Box from '../../common/Box/Box';
import Logo from '../../../assets/logo.svg';
import FlexContainer from '../../common/FlexContainer/FlexContainer';
import InvitationButtonGroup from '../InvitationButtonGroup/InvitationButtonGroup';
import { getInvitedGroup } from '../../../api/group';
import { saveSessionStorageItem } from '../../../utils/storage';

function InvitationContainer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { invitationCode } = useParams() as { invitationCode: string };
  const {
    data: invitedGroup,
    isLoading,
    isSuccess
  } = useQuery(['invitedGroup'], () => getInvitedGroup(invitationCode), {
    onError: (err) => {
      if (err instanceof AxiosError) {
        const status = err.response?.status;

        if (status === 401) {
          saveSessionStorageItem('redirectUrl', location.pathname);
          navigate('/');
          alert('로그인이 필요한 서비스입니다!');
        }
      }
    }
  });

  useEffect(() => {
    if (invitedGroup?.isJoined) {
      navigate(`/groups/${invitedGroup?.groupCode}`);
      alert('이미 속해있는 그룹의 초대장입니다~');
    }
  }, [invitedGroup?.isJoined]);

  if (isLoading) return <div>로딩중</div>;
  if (!isSuccess) return <div>실패</div>;

  return (
    <Box width="60rem" minHeight="65.2rem" padding="9.2rem 0">
      <FlexContainer
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        gap="6.6rem"
      >
        <StyledLogo src={Logo} alt="logo" />
        <StyledTitle>
          {invitedGroup?.name}
          그룹으로 초대합니다
        </StyledTitle>
        <InvitationButtonGroup
          // NOTE: useParams으로 code들을 다 내려주고 있는데, navigate만 내려주지 않고 자식 컴포넌트에서
          // 다시 호출해서 navigate를 만드는 게 맞을까?
          navigate={navigate}
          invitationCode={invitationCode}
          groupCode={invitedGroup.groupCode}
        />
      </FlexContainer>
    </Box>
  );
}

const StyledLogo = styled.img`
  width: 32rem;
`;

const StyledTitle = styled.p`
  font-size: 3.2rem;
`;

export default InvitationContainer;
