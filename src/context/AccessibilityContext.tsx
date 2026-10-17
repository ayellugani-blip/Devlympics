import React, { createContext, useContext, useState, useEffect } from 'react';
import type { SupportedLanguage, FontScale, AccessibilitySettings } from '../types';
import { TRANSLATIONS, type TranslationDictionary } from '../data/translations';

interface AccessibilityContextType extends AccessibilitySettings {
  setFontSize: (size: FontScale) => void;
  setHighContrast: (enabled: boolean) => void;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationDictionary;
  speakText: (text: string) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSize, setFontSizeState] = useState<FontScale>(() => {
    return (localStorage.getItem('sangam_font_size') as FontScale) || 'normal';
  });

  const [highContrast, setHighContrastState] = useState<boolean>(() => {
    return localStorage.getItem('sangam_high_contrast') === 'true';
  });

  const [selectedLanguage, setSelectedLanguageState] = useState<SupportedLanguage>(() => {
    return (localStorage.getItem('sangam_language') as SupportedLanguage) || 'en';
  });

  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Apply font size class to <html> element
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('text-size-lg', 'text-size-xl');
    if (fontSize === 'large') {
      root.classList.add('text-size-lg');
    } else if (fontSize === 'xlarge') {
      root.classList.add('text-size-xl');
    }
    localStorage.setItem('sangam_font_size', fontSize);
  }, [fontSize]);

  // Apply high contrast class to <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    localStorage.setItem('sangam_high_contrast', String(highContrast));
  }, [highContrast]);

  // Persist language
  useEffect(() => {
    localStorage.setItem('sangam_language', selectedLanguage);
  }, [selectedLanguage]);

  const setFontSize = (size: FontScale) => {
    setFontSizeState(size);
  };

  const setHighContrast = (enabled: boolean) => {
    setHighContrastState(enabled);
  };

  const setLanguage = (lang: SupportedLanguage) => {
    setSelectedLanguageState(lang);
  };

  // Text-to-Speech utility
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) {
      console.warn('SpeechSynthesis is not supported in this browser.');
      return;
    }

    window.speechSynthesis.cancel();
    setIsSpeaking(true);

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Choose appropriate voice/lang if available
    const langCodeMap: Record<SupportedLanguage, string> = {
      en: 'en-US',
      hi: 'hi-IN',
      te: 'te-IN',
      ta: 'ta-IN',
      mr: 'mr-IN'
    };
    utterance.lang = langCodeMap[selectedLanguage] || 'en-US';
    utterance.rate = 0.95; // Slightly slower for clarity
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const t = TRANSLATIONS[selectedLanguage] || TRANSLATIONS.en;

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        highContrast,
        selectedLanguage,
        setFontSize,
        setHighContrast,
        setLanguage,
        t,
        speakText,
        stopSpeaking,
        isSpeaking
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
