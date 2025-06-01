import React, { useState, useEffect, useRef } from 'react';
import { MoreVertical, Download, Trash2, Loader2 } from 'lucide-react';

// Custom hook for media query
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};

interface ActionMenuProps {
  onExport?: () => void;
  onDelete: () => void;
  isDeleting: boolean;
  showExport?: boolean;
}

const ActionMenu: React.FC<ActionMenuProps> = ({
  onExport,
  onDelete,
  isDeleting,
  showExport = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isLargeScreen = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6" ref={menuRef}>
      <div className="relative">
        {isOpen && (
          <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg overflow-hidden w-48">
            {showExport && onExport && (
              <button
                onClick={() => {
                  onExport();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
              >
                <Download size={16} />
                <span>Export</span>
              </button>
            )}

            <button
              onClick={() => {
                onDelete();
                setIsOpen(false);
              }}
              disabled={isDeleting}
              className={`w-full flex items-center gap-2 px-4 py-3 text-left transition-colors ${
                isDeleting
                  ? 'text-gray-400 bg-gray-50 cursor-not-allowed'
                  : 'text-red-600 hover:bg-red-50'
              }`}
            >
              {isDeleting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <Trash2 size={16} />
                  <span>Delete</span>
                </>
              )}
            </button>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors border border-blue-300 flex items-center gap-2"
        >
          <MoreVertical size={24} className="text-gray-600" />
          {isLargeScreen && <span className="text-gray-600">More Options</span>}
        </button>
      </div>
    </div>
  );
};

export default ActionMenu; 