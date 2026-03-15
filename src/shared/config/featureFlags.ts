export const FEATURE_FLAGS = {
  paywall: {
    showTopChips: true,
    showRegionalMetrics: true,
    showLegalNotes: true,
  },
  meditations: {
    showPromptPreview: true,
    showLibrarySelectionSummary: true,
  },
  preferences: {
    showPricingPreview: true,
    showDemoSubscriptionState: true,
  },
} as const;

export type FeatureFlags = typeof FEATURE_FLAGS;
