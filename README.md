# ZenPulse: AI-приложение для медитации

Production-like реализация тестового задания на Expo/React Native.

## Что включено

- 3 экрана:
  - **Paywall**
  - **Meditations**
  - **Preferences**
- оболочка экранов на базе SafeArea
- блокировка контента по `isSubscribed`
- AI-флоу «настрой дня» / аффирмация с билдером промпта и реалистичным mock-ответом
- поддержка тем (`dark` / `light`)
- локализация (`en` / `ru`)
- конфиги и бизнес-данные вынесены из UI-компонентов
- разделённая архитектура вместо монолитного `App.tsx`

## Структура

```text
src/
  app/
    AppRoot.tsx
    navigation/AppNavigator.tsx
    providers/AppProviders.tsx
    state/AppContext.tsx
  screens/
    PaywallScreen.tsx
    MeditationsScreen.tsx
    PreferencesScreen.tsx
  features/
    affirmation/
    meditations/
    settings/
    subscription/
  shared/
    config/
    i18n/
    theme/
    ui/