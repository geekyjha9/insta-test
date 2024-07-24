import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfilePosts from '../src/components/Profile/ProfilePosts.js';
import ProfileHeader from '../src/components/Profile/ProfileHeader.js';
import '@testing-library/jasmine-dom'; // Ensure this is correctly set up

describe('ProfilePosts Component', () => {
  it('[REQ016]_should_render_username_correctly', () => {
    render(<ProfileHeader />);
    const usernameElement = screen.getByText(/username/i);
    
    
    
    // Ensure the username element is truthy
    expect(usernameElement.textContent).toBe('username');
  });

  it('[REQ017]_should_render_posts_with_correct_src_and_alt_attributes', () => {
    render(<ProfilePosts />);
    const postElements = screen.getAllByRole('img');

    postElements.forEach((postElement, index) => {
      // Check if the 'src' attribute exists and matches the expected value
      expect(postElement.getAttribute('src')).toBe('https://via.placeholder.com/150');
      // Check if the 'alt' attribute exists and matches the expected value
      expect(postElement.getAttribute('alt')).toBe(`Post ${index + 1}`);
    });
  });
});
