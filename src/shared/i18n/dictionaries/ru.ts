export const ru = {
  nav: {
    openSettings: 'Настройки',
    backToMeditations: 'Назад к медитациям',
  },
  paywall: {
    eyebrow: 'ZenPulse Premium',
    title: 'Спокойствие и фокус с премиальными медитациями',
    subtitle: 'Откройте эксклюзивные практики, глубокие сессии концентрации и AI-настрой дня.',
    tryFree: 'Попробовать бесплатно и открыть Premium',
    continueFree: 'Продолжить с ограниченным контентом',
    legalMock: 'Демо-логика: покупка замокана. Нажатие CTA выставляет isSubscribed = true.',
    benefits: [
      'Безлимитный доступ к премиальным сессиям',
      'Эксклюзивные практики сна, фокуса и снижения стресса',
      'AI-аффирмация дня под ваше состояние',
      'Чистый и спокойный интерфейс без отвлечений',
    ],
    plans: {
      monthly: {
        title: 'Месячный Premium',
        subtitle: 'Гибкий доступ, отмена в любое время',
      },
      yearly: {
        title: 'Годовой Premium',
        subtitle: 'Самый выгодный вариант для регулярной практики',
        badge: 'Выгодно',
      },
    },
  },
  meditations: {
    title: 'Медитации',
    premiumUnlocked: 'Premium открыт. Доступна вся библиотека.',
    freeMode: 'Активен бесплатный режим. Часть сессий заблокирована.',
    upgrade: 'Открыть Premium',
    premium: 'Premium',
    aiEyebrow: 'AI настрой дня',
    aiTitle: 'Как вы себя чувствуете сейчас?',
    aiButton: 'Сгенерировать AI-аффирмацию',
    aiPlaceholder: 'Выберите настроение и получите персональную AI-аффирмацию.',
    featured: 'Рекомендованные сессии',
    featuredCaption: 'Заблокированные премиум-карточки ведут обратно на Paywall.',
    openSession: 'Открыть сессию',
    lockedSession: 'Только Premium — переход на Paywall',
  },
  preferences: {
    title: 'Настройки',
    language: 'Язык',
    theme: 'Тема',
    light: 'Светлая',
    dark: 'Тёмная',
  },
  moods: {
    calm: 'Спокойно',
    neutral: 'Нормально',
    stressed: 'Стресс',
  },
  common: {
    mockPrompt: 'Мок LLM-промпта',
    generating: 'Генерация…',
    sessionOpenedPrefix: 'Открыто',
    sessionOpenedSuffix: 'Плеер сессии можно добавить позже.',
  },
} as const;
