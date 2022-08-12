import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getGroupMembers } from '../../api/group';
import { GroupInterface, MemberInterface } from '../../types/group';
import Avatar from '../common/Avatar/Avatar';

interface Props {
  groupCode: GroupInterface['code'];
}

function MembersProfile({ groupCode }: Props) {
  const navigate = useNavigate();
  const { data: groupMembers } = useQuery(
    ['groupMembers', groupCode],
    () => getGroupMembers(groupCode),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          const status = error.response?.status;
          if (status === 401) {
            alert('로그인 해주세요~');
            navigate('/');
          }

          if (status === 404 || 403 || 400) {
            alert('그룹이 없어요~');
            navigate('/');
          }
        }
      }
    }
  );

  return (
    <StyledContainer>
      {groupMembers?.map(({ profileUrl, name }) => (
        <Avatar profileUrl={profileUrl} name={name} />
      ))}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  gap: 1.2rem;
  margin: 2rem 0;
`;

export default MembersProfile;
