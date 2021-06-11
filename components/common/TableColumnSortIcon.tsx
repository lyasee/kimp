import * as React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Sort } from '../../types/coin.types';
import useColorScheme from '../../hooks/useColorScheme';
import Colors from '../../constants/Colors';

type Props = {
  type?: Sort;
};

const size = 12;

const TableColumnSortIcon: React.FC<Props> = ({ type }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  if (type === Sort.ASC) {
    return <FontAwesome name="sort-up" size={size} color={colors.sortActive} />;
  }

  if (type === Sort.DESC) {
    return <FontAwesome name="sort-down" size={size} color={colors.sortActive} />;
  }

  return <FontAwesome name="sort" size={size} color={colors.sortInActive} />;
};

export default TableColumnSortIcon;
