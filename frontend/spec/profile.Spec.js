import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfilePosts from '../src/components/Profile/ProfilePost.js';
import '@testing-library/jasmine-dom'; // Ensure this is correctly set up

describe('ProfilePosts Component', () => {
  it('[REQ012]_should_render_the_correct_number_of_posts', () => {
    render(<ProfilePosts />);
    const postElements = screen.getAllByRole('img');
    expect(postElements.length).toBe(3); // Assuming there are 4 posts
  });

  it('[REQ013]_should_render_posts_with_correct_src_and_alt_attributes', () => {
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
