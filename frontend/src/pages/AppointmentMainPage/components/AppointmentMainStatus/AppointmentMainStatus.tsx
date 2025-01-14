import { useTheme } from '@emotion/react';
import TextField from '@/components/TextField/TextField';
import { StyledStatus } from '@/pages/AppointmentMainPage/components/AppointmentMainStatus/AppointmentMainStatus.styles';

type Props = {
  isClosed: boolean;
};

function AppointmentMainStatus({ isClosed }: Props) {
  const theme = useTheme();

  return (
    <TextField
      variant="filled"
      width="20%"
      padding="0.8rem 0"
      borderRadius="5px"
      colorScheme={!isClosed ? theme.colors.PURPLE_100 : theme.colors.GRAY_400}
    >
      <StyledStatus>{!isClosed ? '진행중' : '완료'}</StyledStatus>
    </TextField>
  );
}

export default AppointmentMainStatus;
