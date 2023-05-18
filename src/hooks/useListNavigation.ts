import { useState, useEffect } from 'react';

const useListNavigation = (listItems:any[]) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
          
        if (event.key === 'ArrowUp') {
          event.preventDefault();
          setSelectedIndex((prevIndex) => ( prevIndex !== null && prevIndex !== 0) ? prevIndex - 1 : listItems.length-1);
        } else if (event.key === 'ArrowDown') {
          event.preventDefault();
          setSelectedIndex((prevIndex) => (prevIndex !== (listItems.length-1) && prevIndex !== null) ? prevIndex + 1 : 0);
        }
      };
  
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [selectedIndex, listItems]);
  
  const handleHighlightSelected = (index: number | null) => {
      setSelectedIndex(index);
    };
  
    return { selectedIndex, handleHighlightSelected };
  };
export default useListNavigation;