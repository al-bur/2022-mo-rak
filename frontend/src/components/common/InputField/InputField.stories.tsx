import React from 'react';
import { Meta, Story } from '@storybook/react';
import InputField from './InputField';
import theme from '../../../styles/theme';
import Input from '../Input/Input';

export default {
  title: 'Reusable Components/InputField',
  component: InputField
} as Meta;

const Template: Story = (args) => (
  <InputField {...args}>
    <Input placeholder="투표 제목을 입력해주세요🧐" />
  </InputField>
);

export const Outlined = Template.bind({});
Outlined.args = {
  color: theme.colors.BLACK_100,
  colorScheme: theme.colors.PURPLE_100,
  borderRadius: '10px',
  variant: 'outlined'
};

export const Filled = Template.bind({});
Filled.args = {
  color: theme.colors.BLACK_100,
  colorScheme: theme.colors.PURPLE_100,
  borderRadius: '10px',
  variant: 'filled'
};

export const Unstyled = Template.bind({});
Unstyled.args = {
  color: theme.colors.BLACK_100,
  colorScheme: theme.colors.PURPLE_100,
  borderRadius: '10px',
  variant: 'unstyled'
};
