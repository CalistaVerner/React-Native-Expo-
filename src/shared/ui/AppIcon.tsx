import React from 'react';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export type AppIconName = React.ComponentProps<typeof FontAwesome6>['name'];

type Props = {
  name: AppIconName;
  size?: number;
  color: string;
  solid?: boolean;
};

export function AppIcon({ name, size = 16, color, solid = true }: Props) {
  return <FontAwesome6 name={name} size={size} color={color} solid={solid} />;
}
