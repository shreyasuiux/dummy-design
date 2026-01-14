// Main App Component
import React, { useState } from "react";
import Desktop2 from "../imports/Desktop72";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SearchModal } from "./components/SearchModal";
import { 
  navigateToService, 
  navigateToProduct, 
  navigateToWhoWeAre, 
  navigateToHome 
} from "./utils/navigationHelper";

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Navigation handlers using centralized utility
  const handleServiceClick = (serviceTitle: string) => {
    navigateToService(serviceTitle);
  };

  const handleProductClick = (productTitle: string) => {
    navigateToProduct(productTitle);
  };

  const handleWhoWeAreItemClick = (item: string) => {
    navigateToWhoWeAre(item);
  };

  const handleLogoClick = () => {
    navigateToHome();
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  return (
    <ThemeProvider>
      <div className="w-full transition-colors duration-300" style={{ backgroundColor: 'var(--theme-bg-primary)' }}>
        <Desktop2 onSearchClick={handleSearchClick} />
        <Footer 
          onServiceClick={handleServiceClick}
          onProductClick={handleProductClick}
          onWhoWeAreItemClick={handleWhoWeAreItemClick}
          onLogoClick={handleLogoClick}
        />
        <SearchModal 
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />
      </div>
    </ThemeProvider>
  );
}