
import React from 'react';
import Button from '../Button';

interface FilterSectionProps {
  categoryFilter: string;
  priorityFilter: string;
  setCategoryFilter: (category: string) => void;
  setPriorityFilter: (priority: string) => void;
  categoryFilters: string[];
  priorityFilters: string[];
  onResetFilters: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  categoryFilter,
  priorityFilter,
  setCategoryFilter,
  setPriorityFilter,
  categoryFilters,
  priorityFilters,
  onResetFilters
}) => {
  return (
    <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="glass rounded-xl p-6 border border-white/50">
        <h3 className="text-lg font-medium mb-4">Filter by Category</h3>
        <div className="flex flex-wrap gap-2">
          {categoryFilters.map(category => (
            <button
              key={category}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                categoryFilter === category
                  ? 'bg-fem-primary text-white'
                  : 'bg-white text-fem-dark/70 hover:bg-fem-soft'
              }`}
              onClick={() => setCategoryFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <div className="glass rounded-xl p-6 border border-white/50">
        <h3 className="text-lg font-medium mb-4">Filter by Priority</h3>
        <div className="flex flex-wrap gap-2">
          {priorityFilters.map(priority => (
            <button
              key={priority}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                priorityFilter === priority
                  ? 'bg-fem-primary text-white'
                  : 'bg-white text-fem-dark/70 hover:bg-fem-soft'
              }`}
              onClick={() => setPriorityFilter(priority)}
            >
              {priority}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
