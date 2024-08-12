import React from 'react';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import FeedCard from '../src/components/Feed/FeedCard/FeedCard';
import { supabase } from '../src/services/supabaseClientMock';

const API_URL = window.location.origin.replace("3000", "8888");

describe('FeedCard component comment functionality tests', () => {
  let container;
  let post;
  let fetchSpy;

  beforeEach(() => {
    // Set up initial post data
    post = {
      id: 1,
      content: 'Test post content',
      comments: [],
      liked: false,
    };

    // Mock fetch globally
    spyOn(window, 'fetch').and.callFake((url, options) => {
      if (url.endsWith(`/api/comments/getComments/${post.id}`) && options.method === 'GET') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([{ id: 1, content: 'Test comment', username: 'user1' }]),
        });
      }
      if (url.endsWith('/api/comments/addComments') && options.method === 'POST') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ id: 2, content: 'New comment', username: 'user2' }),
        });
      }
      return Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ error: 'An error occurred' }),
      });
    });

    container = render(<FeedCard post={post} />);
  });

  afterEach(() => {
    cleanup();
    window.fetch.calls.reset();
  });

  it('[REQ045]_should_fetch_and_display_comments_when_comment_icon_is_clicked', async () => {
    const { getByTestId, getByText } = container;

    // Click on the comment icon
    const commentIcon = getByTestId(`comment-icon-${post.id}`);
    fireEvent.click(commentIcon);

    // Wait for comments to be fetched and displayed
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(`${API_URL}/api/comments/getComments/${post.id}`, jasmine.objectContaining({
        method: 'GET',
      }));

      expect(getByText('Test comment')).toBeTruthy();
      expect(getByText('user1')).toBeTruthy();
    });
  });

  it('[REQ046]_should_add_a_new_comment_when_submit_button_is_clicked', async () => {
    const { getByPlaceholderText, getByText, getByTestId } = container;

    // Click on the comment icon to open comments
    const commentIcon = getByTestId(`comment-icon-${post.id}`);
    fireEvent.click(commentIcon);

    // Enter a new comment
    const commentInput = getByPlaceholderText('Add a comment...');
    fireEvent.change(commentInput, { target: { value: 'New comment' } });

    // Click the submit button
    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);

    // Wait for the new comment to be added and displayed
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(`${API_URL}/api/comments/addComments`, jasmine.objectContaining({
        method: 'POST',
        headers: jasmine.objectContaining({
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json',
        }),
        body: jasmine.any(String),
      }));

      expect(getByText('New comment')).toBeTruthy();
      expect(getByText('user2')).toBeTruthy();
    });
  });
});
