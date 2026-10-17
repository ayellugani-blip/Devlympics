import React from 'react';
import { Search, X, ArrowUpDown } from 'lucide-react';
import { CATEGORIES, EDUCATION_LEVELS } from '../../data/opportunities';

interface SearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedEducation: string;
  onEducationChange: (edu: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalResults: number;
  onResetFilters: () => void;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedEducation,
  onEducationChange,
  sortBy,
  onSortChange,
  totalResults,
  onResetFilters
}) => {
  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All' ||
    selectedEducation !== 'All Education Levels' ||
    sortBy !== 'deadline';

  return (
    <div className="bg-white border border-[#E2EBF5] rounded-2xl p-4 sm:p-5 shadow-xs mb-8 space-y-4">
      {/* Top Search Input */}
      <div className="relative">
        <Search className="w-5 h-5 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by title, organization, keywords (e.g. scholarship, code, merit, women)..."
          className="w-full pl-11 pr-10 py-2.5 text-sm rounded-xl border border-[#E2EBF5] bg-[#FAFCFF] focus:bg-white focus:outline-hidden focus:border-[#2878D4] focus:ring-1 focus:ring-[#2878D4] transition-all text-[#20334A] placeholder:text-[#64748B]"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#20334A] p-1"
            aria-label="Clear search query"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#2878D4] text-white shadow-xs'
                  : 'bg-[#F1F6FB] text-[#64748B] hover:bg-[#EAF5FF] hover:text-[#2878D4]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Secondary Dropdowns & Result Stats */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E2EBF5] text-xs">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Education Level Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[#64748B] font-medium">Education:</span>
            <select
              value={selectedEducation}
              onChange={(e) => onEducationChange(e.target.value)}
              className="py-1 px-2.5 bg-[#FAFCFF] border border-[#E2EBF5] rounded-lg text-[#20334A] text-xs focus:outline-hidden focus:border-[#2878D4] cursor-pointer"
            >
              {EDUCATION_LEVELS.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#64748B]" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="py-1 px-2.5 bg-[#FAFCFF] border border-[#E2EBF5] rounded-lg text-[#20334A] text-xs focus:outline-hidden focus:border-[#2878D4] cursor-pointer"
            >
              <option value="deadline">Closing Soonest</option>
              <option value="days_left">Maximum Days Remaining</option>
              <option value="title_asc">Title (A - Z)</option>
            </select>
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="text-xs text-rose-600 hover:text-rose-700 font-medium underline underline-offset-2 ml-1 cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Counter */}
        <div className="text-[#64748B] font-medium">
          Showing <span className="font-bold text-[#20334A]">{totalResults}</span> verified opportunities
        </div>
      </div>
    </div>
  );
};
