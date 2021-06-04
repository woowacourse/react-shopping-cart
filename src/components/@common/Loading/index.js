import React from 'react';
import { CharacterImage, ImageWrapper, LoadingDimmer } from './index.styles';
import characterPng from '../../../assets/image/baemini.png';

const Loading = () => {
  return (
    <LoadingDimmer>
      <ImageWrapper>
        <CharacterImage src={characterPng} alt="character" />
      </ImageWrapper>
    </LoadingDimmer>
  );
};

export default Loading;
