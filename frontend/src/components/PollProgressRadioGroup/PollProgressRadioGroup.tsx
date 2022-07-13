import React, { useEffect, useState } from 'react';

import { useTheme } from '@emotion/react';
import FlexContainer from '../common/FlexContainer/FlexContainer';

import { PollInterface, PollItemInterface } from '../../types/poll';

import { getPollItems } from '../../api/poll';
import InputField from '../common/InputField/InputField';
import Radio from '../common/Radio/Radio';

interface Props {
  pollId: PollInterface['id'];
}

function PollProgressRadioGroup({ pollId }: Props) {
  const theme = useTheme();
  const [pollItems, setPollItems] = useState<Array<PollItemInterface>>();

  useEffect(() => {
    const fetchPollItems = async (pollId: PollInterface['id']) => {
      const res = await getPollItems(pollId);

      setPollItems(res);
    };

    try {
      if (pollId) {
        fetchPollItems(pollId);
      }
    } catch (err) {
      alert(err);
    }
  }, []);

  return (
    <FlexContainer flexDirection="column" gap="1.2rem">
      {/* // TODO: 반복되는 Button 제거 */}
      {/* TODO: Radio로 만들기 */}
      {pollItems?.map((pollItem: PollItemInterface) => (
        <InputField
          colorScheme={theme.colors.PURPLE_100}
          width="74.4rem"
          height="3.6rem"
          variant="outlined"
          borderRadius="10px"
        >
          <Radio id={pollItem.id} name={String(pollId)}>
            {pollItem.subject}
          </Radio>
        </InputField>
      ))}
    </FlexContainer>
  );
}

export default PollProgressRadioGroup;
