import { Meta, Story } from '@storybook/react';
import Radio from './Radio';

export default {
  title: 'Reusable Components/Radio',
  component: Radio
} as Meta;

const DefaultTemplate: Story = (args) => <Radio name="story" {...args} />;

export const Default = DefaultTemplate.bind({});
Default.args = {};
