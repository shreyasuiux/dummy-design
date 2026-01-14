/**
 * NAVIGATION HELPER UTILITY
 * PURPOSE: Centralized navigation system for proper redirection
 * ENSURES: Reliable navigation on both desktop and mobile
 */

// Navigation event types
export type NavigationEventType = 
  | 'navigate-service'
  | 'navigate-product'
  | 'navigate-ai'
  | 'navigate-whoweare'
  | 'navigate-home'
  | 'navigate-casestudies';

/**
 * Dispatch navigation event
 * @param eventType - Type of navigation event
 * @param detail - Optional detail data (e.g., page title)
 */
export function dispatchNavigation(eventType: NavigationEventType, detail?: any): void {
  // Ensure we're in browser environment
  if (typeof window === 'undefined') return;
  
  // Scroll to top immediately for better UX
  window.scrollTo({ top: 0, behavior: 'auto' });
  
  // Create and dispatch custom event
  const event = new CustomEvent(eventType, { 
    detail,
    bubbles: true,
    cancelable: true 
  });
  
  // Use setTimeout to ensure event is dispatched after current execution
  setTimeout(() => {
    window.dispatchEvent(event);
  }, 0);
  
  // Log for debugging (remove in production)
  console.log(`[Navigation] Dispatched: ${eventType}`, detail);
}

/**
 * Navigate to service page
 */
export function navigateToService(serviceTitle: string): void {
  dispatchNavigation('navigate-service', serviceTitle);
}

/**
 * Navigate to product page
 */
export function navigateToProduct(productTitle: string): void {
  dispatchNavigation('navigate-product', productTitle);
}

/**
 * Navigate to AI page
 */
export function navigateToAI(aiTitle?: string): void {
  dispatchNavigation('navigate-ai', aiTitle);
}

/**
 * Navigate to Who We Are section
 */
export function navigateToWhoWeAre(item: string): void {
  dispatchNavigation('navigate-whoweare', item);
}

/**
 * Navigate to home page
 */
export function navigateToHome(): void {
  dispatchNavigation('navigate-home');
}

/**
 * Navigate to case studies
 */
export function navigateToCaseStudies(): void {
  dispatchNavigation('navigate-casestudies');
}

/**
 * Service titles mapping (for consistency)
 */
export const SERVICE_TITLES = {
  CLOUD_PRACTICE: 'Cloud Practice',
  DIGITAL_ENGINEERING: 'Digital & Product Engineering',
  BIG_DATA: 'Big Data',
  APP_MODERNIZATION: 'App Modernization',
  SECURITY: 'Security',
  DATABASE_MANAGEMENT: 'Database Management',
  ERP_TESTING: 'ERP & Testing',
} as const;

/**
 * Product titles mapping (for consistency)
 */
export const PRODUCT_TITLES = {
  AGENT_STUDIO: 'Agent Studio',
  ATLAS_API_MANAGER: 'Atlas API Manager',
  OTTOHM_VIDEO: 'Ottohm Video',
  ITSM_TICKETING: 'ITSM Ticketing',
  AI_OPS: 'AI Ops Platform',
  SMART_CONTRACTS: 'Smart Contracts',
} as const;

/**
 * AI Solution titles mapping
 */
export const AI_TITLES = {
  BFSI_AGENTS: 'BFSI Agents',
  BRAND_MANAGEMENT: 'Brand Management Agents',
} as const;

/**
 * Who We Are items mapping
 */
export const WHO_WE_ARE_ITEMS = {
  OUR_TEAM: 'Our Team',
  ABOUT_US: 'About Us',
  PARTNERS: 'Partners',
  CAREERS: 'Careers',
  NEWS: 'News & Updates',
} as const;

/**
 * Setup navigation event listeners
 * @param handlers - Object containing handler functions
 * @returns Cleanup function to remove listeners
 */
export function setupNavigationListeners(handlers: {
  onServiceClick?: (serviceTitle: string) => void;
  onProductClick?: (productTitle: string) => void;
  onAIClick?: (aiTitle: string) => void;
  onWhoWeAreItemClick?: (item: string) => void;
  onHomeClick?: () => void;
  onCaseStudiesClick?: () => void;
}): () => void {
  if (typeof window === 'undefined') return () => {};
  
  // Create event listener functions
  const handleNavigateService = (e: Event) => {
    const detail = (e as CustomEvent).detail;
    console.log('[Navigation] Service clicked:', detail);
    handlers.onServiceClick?.(detail);
  };
  
  const handleNavigateProduct = (e: Event) => {
    const detail = (e as CustomEvent).detail;
    console.log('[Navigation] Product clicked:', detail);
    handlers.onProductClick?.(detail);
  };
  
  const handleNavigateAI = (e: Event) => {
    const detail = (e as CustomEvent).detail;
    console.log('[Navigation] AI clicked:', detail);
    handlers.onAIClick?.(detail);
  };
  
  const handleNavigateWhoWeAre = (e: Event) => {
    const detail = (e as CustomEvent).detail;
    console.log('[Navigation] Who We Are clicked:', detail);
    handlers.onWhoWeAreItemClick?.(detail);
  };
  
  const handleNavigateHome = () => {
    console.log('[Navigation] Home clicked');
    handlers.onHomeClick?.();
  };
  
  const handleNavigateCaseStudies = () => {
    console.log('[Navigation] Case Studies clicked');
    handlers.onCaseStudiesClick?.();
  };
  
  // Add event listeners
  window.addEventListener('navigate-service', handleNavigateService);
  window.addEventListener('navigate-product', handleNavigateProduct);
  window.addEventListener('navigate-ai', handleNavigateAI);
  window.addEventListener('navigate-whoweare', handleNavigateWhoWeAre);
  window.addEventListener('navigate-home', handleNavigateHome);
  window.addEventListener('navigate-casestudies', handleNavigateCaseStudies);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('navigate-service', handleNavigateService);
    window.removeEventListener('navigate-product', handleNavigateProduct);
    window.removeEventListener('navigate-ai', handleNavigateAI);
    window.removeEventListener('navigate-whoweare', handleNavigateWhoWeAre);
    window.removeEventListener('navigate-home', handleNavigateHome);
    window.removeEventListener('navigate-casestudies', handleNavigateCaseStudies);
  };
}

/**
 * Get current page from URL or state
 */
export function getCurrentPage(): string {
  if (typeof window === 'undefined') return 'Home';
  
  // Could be extended to use URL parameters or hash
  const hash = window.location.hash.replace('#', '');
  return hash || 'Home';
}

/**
 * Utility to close all mobile menus
 */
export function closeAllMobileMenus(): void {
  if (typeof window === 'undefined') return;
  
  // Dispatch event to close mobile menus
  window.dispatchEvent(new CustomEvent('close-mobile-menu'));
  
  // Remove body scroll lock
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.width = '';
}

/**
 * Utility to prevent body scroll (for mobile menus)
 */
export function preventBodyScroll(prevent: boolean): void {
  if (typeof window === 'undefined') return;
  
  if (prevent) {
    // Save current scroll position
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
  } else {
    // Restore scroll position
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }
}

/**
 * Debounce navigation calls to prevent double-clicks
 */
let navigationTimeout: NodeJS.Timeout | null = null;

export function debouncedNavigate(callback: () => void, delay: number = 300): void {
  if (navigationTimeout) {
    clearTimeout(navigationTimeout);
  }
  
  navigationTimeout = setTimeout(() => {
    callback();
    navigationTimeout = null;
  }, delay);
}
