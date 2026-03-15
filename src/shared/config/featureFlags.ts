import featureFlagsJson from '../../../assets/config/feature-flags.json';

export const FEATURE_FLAGS = Object.freeze(featureFlagsJson);

export type FeatureFlags = typeof FEATURE_FLAGS;
