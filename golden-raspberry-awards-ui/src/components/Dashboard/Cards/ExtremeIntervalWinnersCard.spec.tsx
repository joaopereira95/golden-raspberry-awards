import { render } from '@testing-library/react';

import ExtremeIntervalWinnersCard from './ExtremeIntervalWinnersCard';
import { LongestShortestIntervalWinners } from '../../../model/LongestShortestIntervalWinners';

const mockData : LongestShortestIntervalWinners = { 
  min: [
    { producer: 'Producer 1', interval: 1, previousWin: 1999, followingWin: 2000},
    { producer: 'Producer 2', interval: 1, previousWin: 2004, followingWin: 2005},
  ],
  max: [
    { producer: 'Producer 3', interval: 5, previousWin: 1980, followingWin: 1985},
    { producer: 'Producer 4', interval: 5, previousWin: 1970, followingWin: 1975},
  ],
};

/** Tests the ExtremeIntervalWinnersCard Component */
describe('ExtremeIntervalWinnersCard', () => {

    /**
     * When the component is rendered, it should render with the correct title 'Producers with longest and shortest interval between wins'
     */
    it('should render correct title', () => {
      const { getByText } = render(<ExtremeIntervalWinnersCard />);
      expect(getByText('Producers with longest and shortest interval between wins')).toBeInTheDocument();
    });

    /**
     * When the component is rendered without any data, it should be rendered without any errors
     */
    it('should render without data', () => {
      render(<ExtremeIntervalWinnersCard />);
    });

    /**
     * When the component is rendered without any data, it should be rendered without the table
     */
    it('should not render the table without data', () => {
      const { queryByText } = render(<ExtremeIntervalWinnersCard />);

      expect(queryByText('Producer')).not.toBeInTheDocument();
      expect(queryByText('Interval')).not.toBeInTheDocument();
      expect(queryByText('Previous Year')).not.toBeInTheDocument();
      expect(queryByText('Following Year')).not.toBeInTheDocument();
    });

    /**
     * When the component is rendered passing data, it should be rendered successfully
     */
    it('should render with data', () => {
     render(<ExtremeIntervalWinnersCard winners={mockData} />);     
    });

    /**
     * When the component is rendered passing data, it should be rendered successfully and with correct data
     */
    it('should render correct data', () => {
      const { queryByText, getByText } = render(<ExtremeIntervalWinnersCard winners={mockData} />);

      expect(getByText('Producer 1')).toBeInTheDocument();
      expect(getByText('Producer 2')).toBeInTheDocument();
      expect(getByText('Producer 3')).toBeInTheDocument();
      expect(getByText('Producer 4')).toBeInTheDocument();

      expect(queryByText('Producer 5')).not.toBeInTheDocument();
      expect(queryByText('Producer 6')).not.toBeInTheDocument();
     });
  
   
});
 