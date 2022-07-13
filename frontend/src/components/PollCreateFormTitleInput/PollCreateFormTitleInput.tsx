import { useTheme } from '@emotion/react';
import React, { InputHTMLAttributes, ChangeEventHandler } from 'react';
import Input from '../common/Input/Input';
import InputField from '../common/InputField/InputField';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

function PollCreateFormTitleInput({ title, onChange }: Props) {
  const theme = useTheme();

  return (
    <InputField variant="unstyled" colorScheme={theme.colors.PURPLE_100}>
      <Input
        value={title}
        placeholder="투표 제목을 입력해주세요🧐"
        fontSize="3.2rem"
        color={theme.colors.BLACK_100}
        textAlign="left"
        onChange={onChange}
        required
      />
    </InputField>
  );
}

export default PollCreateFormTitleInput;
