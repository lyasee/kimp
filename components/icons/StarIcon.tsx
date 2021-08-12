import React from 'react';
import { AntDesign } from '@expo/vector-icons';

type Props = {
  fill?: boolean;
  color?: string;
  size?: number;
};

const StarIcon: React.FC<Props> = ({ fill, color = 'black', size = 24 }) => {
  if (fill) {
    return <AntDesign name="star" size={size} color={color} />;
  }

  return <AntDesign name="staro" size={size} color={color} />;
};

export default StarIcon;
