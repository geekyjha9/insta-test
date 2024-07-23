import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jasmine-dom';
import TopNav from '../src/components/headers/TopNav/TopNav';

describe('TopNav Component', () => {
  it('[REQ001]_renders_search_input_and_button_correctly', () => {
    render(<TopNav />);

    // Check if the search input is rendered
    const searchInput = screen.getByPlaceholderText(/Search/i);
    expect(searchInput).toBeTruthy();
    
    // Check if the search button with icon is rendered
    const searchButton = screen.getByRole('button');
    expect(searchButton).toBeTruthy();

   
   
  });
});
