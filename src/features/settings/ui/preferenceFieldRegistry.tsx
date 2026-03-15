import type { PreferenceFieldComponentType } from '../model/preferenceFields';
import { createComponentRegistry } from '../../../shared/lib/componentRegistry';
import { PreferenceSelectField, type PreferenceFieldRendererProps } from './fields/PreferenceSelectField';

type PreferenceFieldPropsByType = {
  select: PreferenceFieldRendererProps;
};

const preferenceFieldRegistry = createComponentRegistry<
  PreferenceFieldComponentType,
  PreferenceFieldPropsByType
>('preferences.fields');

preferenceFieldRegistry.register('select', PreferenceSelectField);

export { preferenceFieldRegistry };
