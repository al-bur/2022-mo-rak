interface GroupInterface {
  code: string;
  name: string;
  members: Array<MemberInterface>;
}

interface MemberInterface {
  id: number;
  name: string;
  profileUrl: string;
}

type getInvitedGroupResponse = Pick<GroupInterface, 'name'> & {
  isJoined: boolean;
  groupCode: GroupInterface['code'];
};

export { GroupInterface, MemberInterface, getInvitedGroupResponse };
