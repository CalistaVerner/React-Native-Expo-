export function canOpenPremiumContent(isSubscribed: boolean, isPremium: boolean) {
  if (!isPremium) {
    return true;
  }

  return isSubscribed;
}

export function resolvePremiumNavigation(isSubscribed: boolean, isPremium: boolean) {
  return canOpenPremiumContent(isSubscribed, isPremium) ? 'open' : 'paywall';
}
