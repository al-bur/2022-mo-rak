import { groupInstance as axios } from './axios';
import { GroupInterface, MemberInterface, getInvitedGroupResponse } from '../types/group';

const getGroups = () => axios.get('');

const getGroupMembers = (groupCode: GroupInterface['code']): Promise<Array<MemberInterface>> =>
  axios.get(`/${groupCode}/members`).then(({ data }) => data);

// TODO: '' 해결해야할듯
const createGroup = (name: GroupInterface['name']) => axios.post('', { name });

const createInvitationCode = (groupCode: GroupInterface['code']) =>
  axios.post(`/${groupCode}/invitation`);

const participateGroup = (invitationCode: string) => axios.post(`/in/${invitationCode}`);

const getInvitedGroup = (invitationCode: string): Promise<getInvitedGroupResponse> =>
  axios.get(`/in/${invitationCode}`).then(({ data }) => data);

const getDefaultGroup = () => axios.get('/default').then(({ data }) => data);

export {
  getGroups,
  createGroup,
  getGroupMembers,
  createInvitationCode,
  participateGroup,
  getInvitedGroup,
  getDefaultGroup
};
