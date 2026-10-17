import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SAMPLE_OPPORTUNITIES } from '../data/opportunities';
import { OpportunityCard } from '../components/opportunities/OpportunityCard';
import { SearchFilterBar } from '../components/opportunities/SearchFilterBar';
import { AlertCircle, Sparkles, FilterX } from 'lucide-react';

export const ExplorePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'All';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedEducation, setSelectedEducation] = useState('All Education Levels');
  const [sortBy, setSortBy] = useState('deadline');

  // Sync state if URL query params change
  useEffect(() => {
    const q = searchParams.get('q');
    const cat = searchParams.get('category');
    if (q !== null) setSearchQuery(q);
    if (cat !== null) setSelectedCategory(cat);
  }, [searchParams]);

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (q) next.set('q', q);
      else next.delete('q');
      return next;
    });
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (cat !== 'All') next.set('category', cat);
      else next.delete('category');
      return next;
    });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedEducation('All Education Levels');
    setSortBy('deadline');
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredOpportunities = useMemo(() => {
    return SAMPLE_OPPORTUNITIES.filter((opp) => {
      // 1. Text Search Filter (title, organization, description, tags)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inTitle = opp.title.toLowerCase().includes(query);
        const inOrg = opp.organization.toLowerCase().includes(query);
        const inDesc = opp.simplifiedDescription.toLowerCase().includes(query);
        const inTags = opp.tags.some((t) => t.toLowerCase().includes(query));
        const inEdu = opp.requiredEducation.toLowerCase().includes(query);
        if (!inTitle && !inOrg && !inDesc && !inTags && !inEdu) return false;
      }

      // 2. Category Filter
      if (selectedCategory !== 'All' && opp.category !== selectedCategory) {
        return false;
      }

      // 3. Education Filter
      if (selectedEducation !== 'All Education Levels') {
        const eduLower = selectedEducation.toLowerCase();
        const oppEduLower = opp.requiredEducation.toLowerCase();
        if (
          !oppEduLower.includes(eduLower) &&
          !oppEduLower.includes('all') &&
          !oppEduLower.includes('students')
        ) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'deadline') {
        return a.deadlineDaysRemaining - b.deadlineDaysRemaining;
      }
      if (sortBy === 'days_left') {
        return b.deadlineDaysRemaining - a.deadlineDaysRemaining;
      }
      if (sortBy === 'title_asc') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedEducation, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Page Header */}
      <div className="mb-8 space-y-2 text-left">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50/80 px-3 py-1 rounded-full border border-indigo-200/70 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Curated Opportunity Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Explore <span className="sangam-gradient-text">Opportunities</span>
        </h1>
        <p className="text-sm sm:text-base text-[#64748B] max-w-3xl">
          Discover verified scholarships, tech internships, national hackathons, and certifications with jargon-free explanations and transparent requirements.
        </p>

        {/* Demo Data Disclaimer */}
        <div className="pt-2 flex items-center gap-2 text-xs text-[#64748B]">
          <AlertCircle className="w-3.5 h-3.5 text-[#62B6F5] shrink-0" />
          <span>
            Demonstration catalog based on official 2026 application circulars. Verify final dates with the issuing organization before applying.
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <SearchFilterBar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        selectedEducation={selectedEducation}
        onEducationChange={setSelectedEducation}
        sortBy={sortBy}
        onSortChange={setSortBy}
        totalResults={filteredOpportunities.length}
        onResetFilters={handleResetFilters}
      />

      {/* Opportunities Grid / Empty State */}
      {filteredOpportunities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map((opp) => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-[#E2EBF5] rounded-2xl p-12 text-center max-w-lg mx-auto shadow-2xs space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#EAF5FF] text-[#2878D4] flex items-center justify-center mx-auto">
            <FilterX className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#20334A]">
            No matching opportunities found
          </h3>
          <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
            We couldn't find any opportunities matching your current filters. Try searching for broader keywords or resetting your filter criteria.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="sangam-gradient-btn px-5 py-2.5 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20 cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      )}

    </div>
  );
};
