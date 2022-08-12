import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Logo from '../../assets/logo.svg';

import GroupInitContainer from '../../components/GroupInit/GroupInitContainer/GroupInitContainer';
import { getDefaultGroup } from '../../api/group';
import { getLocalStorageItem, removeLocalStorageItem } from '../../utils/storage';

function GroupInitPage() {
  const navigate = useNavigate();
  const { isLoading } = useQuery(['defaultGroup'], getDefaultGroup, {
    onSuccess: (res) => {
      const { code: groupCode } = res;

      navigate(`/groups/${groupCode}`);
    },

    onError: (err) => {
      if (err instanceof AxiosError) {
        const status = err.response?.status;

        if (status === 401) {
          removeLocalStorageItem('token');
          navigate('/');
        }
      }
    },

    enabled: !!getLocalStorageItem('token')
  });

  if (isLoading) <div>로딩중입니다</div>;

  return (
    <StyledContainer>
      <StyledLogo src={Logo} alt="logo" />
      <GroupInitContainer />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6.4rem;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const StyledLogo = styled.img`
  width: 35.6rem;
`;

export default GroupInitPage;
