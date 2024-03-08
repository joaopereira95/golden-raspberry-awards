import { render } from '@testing-library/react';

import { StudiosWithWinCount } from '../../../model/StudiosWithWinCount';
import TopThreeStudiosCard from './TopThreeStudiosCard';

const mockData : StudiosWithWinCount = { 
  studios: [
    { name: 'Studio1', winCount: 5 }, 
    { name: 'Studio2', winCount: 3 }, 
    { name: 'Studio3', winCount: 10 }
  ] 
};

/** Tests the TopThreeStudiosCard Component */
describe('TopThreeStudiosCard', () => {

  /**
   * When the component is rendered, it should render with the correct title 'Top 3 studios with winners'
   */
    it('should render correct title', () => {
      const { getByText } = render(<TopThreeStudiosCard />);
      expect(getByText('Top 3 studios with winners')).toBeInTheDocument();
    });

    /**
     * When the component is rendered without any data, it should be rendered without any errors
     */
    it('should render without data', () => {
      render(<TopThreeStudiosCard />);
    });

    /**
     * When the component is rendered without any data, it should be rendered without the table
     */
    it('should not render the table without data', () => {
      const { queryByText } = render(<TopThreeStudiosCard />);

      expect(queryByText('Name')).not.toBeInTheDocument();
      expect(queryByText('Win Count')).not.toBeInTheDocument();
    });

    /**
     * When the component is rendered passing data, it should be rendered successfully
     */
    it('should render with data', () => {
     render(<TopThreeStudiosCard studiosWithWinCount={mockData} />);     
    });

    /**
     * When the component is rendered passing data, it should be rendered successfully and with correct data
     */
    it('should render correct data', () => {
      const { queryByText, getByText } = render(<TopThreeStudiosCard studiosWithWinCount={mockData} />);

      expect(getByText('Studio1')).toBeInTheDocument();
      expect(getByText('Studio2')).toBeInTheDocument();
      expect(getByText('Studio3')).toBeInTheDocument();

      expect(queryByText('Studio0')).not.toBeInTheDocument();
      expect(queryByText('Studio4')).not.toBeInTheDocument();
      expect(queryByText('RandomStudio')).not.toBeInTheDocument();
      expect(queryByText('RandomStudio2')).not.toBeInTheDocument();
     });

     /**
     * When the component is rendered passing data, it should be rendered successfully and with correct sorted data
     */
     it('should render correct sorted data', () => {
      const { getAllByRole } = render(<TopThreeStudiosCard studiosWithWinCount={mockData} />);

      expect(getAllByRole('row')[1]).toHaveTextContent('Studio3');
      expect(getAllByRole('row')[2]).toHaveTextContent('Studio1');
      expect(getAllByRole('row')[3]).toHaveTextContent('Studio2');

     });
  
   
});
 