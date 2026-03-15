import type React from 'react';
import { createLogger } from './logger';

export type RegistryRenderer<TProps> = React.ComponentType<TProps>;

export type ComponentRegistry<TType extends string, TPropsByType extends Record<TType, object>> = {
  register: <K extends TType>(type: K, component: RegistryRenderer<TPropsByType[K]>) => void;
  get: <K extends TType>(type: K) => RegistryRenderer<TPropsByType[K]>;
  has: (type: TType) => boolean;
  list: () => TType[];
};

export function createComponentRegistry<TType extends string, TPropsByType extends Record<TType, object>>(
  scope: string,
): ComponentRegistry<TType, TPropsByType> {
  const logger = createLogger(`component-registry:${scope}`);
  const components = new Map<TType, RegistryRenderer<TPropsByType[TType]>>();

  const register = <K extends TType>(type: K, component: RegistryRenderer<TPropsByType[K]>) => {
    const alreadyRegistered = components.has(type);
    components.set(type, component as RegistryRenderer<TPropsByType[TType]>);
    logger.info(alreadyRegistered ? 'Component replaced' : 'Component registered', { type });
  };

  const get = <K extends TType>(type: K): RegistryRenderer<TPropsByType[K]> => {
    const component = components.get(type);
    if (!component) {
      logger.error('Component is not registered', { type });
      throw new Error(`Component type \"${type}\" is not registered in ${scope}`);
    }

    return component as RegistryRenderer<TPropsByType[K]>;
  };

  return {
    register,
    get,
    has: (type) => components.has(type),
    list: () => Array.from(components.keys()),
  };
}
