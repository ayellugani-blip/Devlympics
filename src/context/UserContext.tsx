import React, { createContext, useContext, useState, useEffect } from 'react';

export interface RecentActivity {
  id: string;
  title: string;
  category: 'Scholarship' | 'Hackathon' | 'Internship' | 'Fellowship' | 'Competition';
  fitScore: string;
  statusText: string;
  date: string;
  deadline: string;
}

export interface UserProfile {
  name: string;
  email: string;
  educationLevel: string;
  fieldOfStudy: string;
  gpaOrMarks: number;
  annualFamilyIncome: number;
  categoryQuota: string;
}

export interface PastUsageData {
  noticesAnalyzedCount: number;
  eligibleMatchesCount: number;
  savedDeadlinesCount: number;
  recentActivities: RecentActivity[];
}

interface UserContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  pastUsage: PastUsageData;
  addRecentActivity: (activity: RecentActivity) => void;
}

const DEFAULT_PROFILE: UserProfile = {
  name: 'Arun Kumar',
  email: 'arun.kumar@univ.edu',
  educationLevel: 'Undergraduate (2nd Year)',
  fieldOfStudy: 'Computer Science & Engineering',
  gpaOrMarks: 84,
  annualFamilyIncome: 350000,
  categoryQuota: 'General'
};

const DEFAULT_PAST_USAGE: PastUsageData = {
  noticesAnalyzedCount: 4,
  eligibleMatchesCount: 6,
  savedDeadlinesCount: 2,
  recentActivities: [
    {
      id: 'opp-1',
      title: 'National Merit Scholarship Scheme 2026',
      category: 'Scholarship',
      fitScore: '84% Fit',
      statusText: 'All Criteria Satisfied',
      date: 'Today, 11:30 AM',
      deadline: 'Nov 30, 2026'
    },
    {
      id: 'opp-3',
      title: 'Smart India Hackathon (SIH 2026) Hardware & Software',
      category: 'Hackathon',
      fitScore: 'Eligible',
      statusText: 'Team Criteria Verified',
      date: 'Yesterday',
      deadline: 'Sep 20, 2026'
    },
    {
      id: 'opp-2',
      title: 'Google Summer of Code (GSoC) 2026 Guidelines',
      category: 'Internship',
      fitScore: 'Eligible',
      statusText: 'Proposal Outline Saved',
      date: '3 days ago',
      deadline: 'Apr 14, 2026'
    }
  ]
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem('sangam_user_profile');
      return stored ? { ...DEFAULT_PROFILE, ...JSON.parse(stored) } : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [pastUsage, setPastUsage] = useState<PastUsageData>(() => {
    try {
      const stored = localStorage.getItem('sangam_past_usage');
      return stored ? { ...DEFAULT_PAST_USAGE, ...JSON.parse(stored) } : DEFAULT_PAST_USAGE;
    } catch {
      return DEFAULT_PAST_USAGE;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sangam_user_profile', JSON.stringify(profile));
    } catch (e) {
      console.warn('Failed to save profile to localStorage', e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('sangam_past_usage', JSON.stringify(pastUsage));
    } catch (e) {
      console.warn('Failed to save past usage to localStorage', e);
    }
  }, [pastUsage]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const addRecentActivity = (activity: RecentActivity) => {
    setPastUsage((prev) => {
      const filtered = prev.recentActivities.filter((a) => a.id !== activity.id);
      return {
        ...prev,
        noticesAnalyzedCount: prev.noticesAnalyzedCount + 1,
        recentActivities: [activity, ...filtered].slice(0, 5)
      };
    });
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        updateProfile,
        pastUsage,
        addRecentActivity
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
