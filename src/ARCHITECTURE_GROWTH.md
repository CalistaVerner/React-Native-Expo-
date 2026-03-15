# ZenPulse architecture growth points

## 1. Screen models

Each screen evolves through a dedicated view-model layer:
- `screens/models/usePaywallScreenModel.ts`
- `screens/models/useMeditationsScreenModel.ts`
- `screens/models/usePreferencesScreenModel.ts`

This keeps React Native markup thin and turns future product changes into data-shaping work instead of screen rewrites.

## 2. App preferences runtime is isolated

`app/state/useAppPreferences.ts` owns:
- hydration
- persistence
- device locale refresh
- theme/language/region resolution
- localized price derivation

That lets `AppContext` stay focused on composition instead of becoming the entire application runtime.

## 3. Preference sections are data-driven

Preferences no longer hardcode each field inside the screen.

`features/settings/config/preferenceSections.ts` defines:
- section grouping
- field metadata
- option providers
- update handlers

To add a future preference such as voice pack, AI tone, notification profile, playback style, or haptics mode, add it to section config and reuse the same UI card.

## 4. Subscription presentation is centralized

`features/subscription/lib/planPresentation.ts` is now the single place where paywall plan cards are derived.

This makes it easier to:
- add more plans
- experiment with pricing presentation
- introduce regional promotional states
- drive paywall A/B variants from data

## 5. Meditation runtime is split by responsibility

Meditations uses separate controller hooks:
- `useAffirmationController` for AI state and generation flow
- `useSessionSelection` for library selection state

This creates a clean base for:
- provider-based AI generation
- session-to-affirmation personalization
- recently played / recommended / bookmarked tabs
- analytics events without polluting screens

## 6. Feature flags define safe growth edges

`shared/config/featureFlags.ts` controls optional product modules such as:
- prompt preview visibility
- library selection summary
- pricing preview cards
- demo subscription state
- paywall metadata blocks

This is a lightweight foundation for:
- demo vs production profiles
- A/B experiments
- staged rollouts
- disabling unstable modules without rewriting screens

## 7. Shared section and surface composition

The project already has reusable surface/select/select-box primitives. The next growth path is to keep screens declarative and let feature configuration drive layout and visibility.

## 8. Component registration instead of hardcoded field rendering

Preferences fields now go through a typed component registry.

This means future field types such as:
- switches
- date selectors
- segmented controls
- async pickers
- premium upsell inline cards

can be introduced by registering a renderer instead of rewriting section cards.

## 9. Shared feedback runtime

Toast and modal interactions now live in shared providers instead of being reimplemented in screens.

This creates one place for:
- animated notifications
- confirmation flows
- future alert policies
- consistent iconography and CTA layout

## 10. Unified icon contract

Font Awesome usage now goes through `shared/ui/AppIcon.tsx` and reusable icon specs.

That gives the project:
- one icon API
- support for solid / regular / brands variants
- typed icon metadata in selects, panels, toast, and modals
- less drift between feature modules

## 11. Asset-driven runtime configuration

Variable product data is no longer authored inline inside feature runtime code.

The application now reads business/runtime data from:
- `assets/config/app-runtime.json`
- `assets/config/settings.json`
- `assets/config/pricing.json`
- `assets/config/feature-flags.json`
- `assets/content/meditations/sessions.json`
- `assets/content/affirmations/*`

This removes business values from screens/hooks and makes content/config changes possible without rewriting feature logic.

## 12. One source of truth for plans, FX and defaults

Default plan selection, USD source prices, FX snapshot date, region-to-currency mapping and rates now come from a single pricing asset.

That eliminates drift between:
- subscription catalog
- preferences preview
- localized pricing runtime
- reset/default logic

## 13. Navigation/runtime constants are centralized

Screen ids and player runtime timings now live in dedicated runtime modules/config instead of being duplicated as string literals or magic numbers across providers and screen models.
