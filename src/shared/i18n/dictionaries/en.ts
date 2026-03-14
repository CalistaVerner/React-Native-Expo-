export const en = {
  nav: {
    openSettings: 'Settings',
    backToMeditations: 'Back to meditations',
  },
  paywall: {
    eyebrow: 'ZenPulse Premium',
    title: 'Build a calmer mind with premium guided sessions',
    subtitle: 'Unlock exclusive meditations, deeper focus journeys, and AI-powered daily guidance.',
    tryFree: 'Try free & unlock Premium',
    continueFree: 'Continue with limited free content',
    legalMock: 'Demo logic: purchase is mocked. Pressing the CTA sets isSubscribed = true.',
    benefits: [
      'Unlimited premium meditation sessions',
      'Exclusive sleep, focus, and stress relief journeys',
      'AI daily affirmation tailored to your mood',
      'Elegant distraction-free experience',
    ],
    plans: {
      monthly: {
        title: 'Monthly Premium',
        subtitle: 'Flexible access, cancel anytime',
      },
      yearly: {
        title: 'Yearly Premium',
        subtitle: 'Best value for a steady practice',
        badge: 'Save 58%',
      },
    },
  },
  meditations: {
    title: 'Meditations',
    premiumUnlocked: 'Premium unlocked. Enjoy the full library.',
    freeMode: 'Free mode active. Some sessions are locked.',
    upgrade: 'Upgrade',
    premium: 'Premium',
    aiEyebrow: 'AI mood of the day',
    aiTitle: 'How do you feel right now?',
    aiButton: 'Generate AI affirmation',
    aiPlaceholder: 'Choose your mood and get a personalized AI affirmation.',
    featured: 'Featured sessions',
    featuredCaption: 'Locked premium cards route back to paywall.',
    openSession: 'Open session',
    lockedSession: 'Premium only — opens paywall',
  },
  preferences: {
    title: 'Preferences',
    language: 'Language',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
  },
  moods: {
    calm: 'Calm',
    neutral: 'Okay',
    stressed: 'Stressed',
  },
  common: {
    mockPrompt: 'Mock LLM prompt',
    generating: 'Generating…',
    sessionOpenedPrefix: 'Opened',
    sessionOpenedSuffix: 'Session player can be added later.',
  },
} as const;
