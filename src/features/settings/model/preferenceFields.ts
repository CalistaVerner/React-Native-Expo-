import type { SelectBoxOption } from '../../../shared/ui/SelectBox';

export type PreferenceFieldKey = 'language' | 'theme' | 'region';
export type PreferenceFieldComponentType = 'select';

export type PreferenceFieldModel = {
  key: PreferenceFieldKey;
  componentType: PreferenceFieldComponentType;
  title: string;
  description?: string;
  modalTitle: string;
  value: string;
  options: SelectBoxOption<string>[];
  onChange: (value: string) => void;
};

export type PreferenceSectionModel = {
  key: 'experience' | 'pricing';
  title: string;
  caption?: string;
  fields: PreferenceFieldModel[];
};
