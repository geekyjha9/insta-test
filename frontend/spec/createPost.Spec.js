import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CreatePost from '../src/components/CreatePost/CreatePost';
import { Context } from '../src/contexts/Context';
import 'jasmine'; 

describe('CreatePost Component', () => {
  it('should render the CreatePost component with all necessary elements', () => {
    render(<CreatePost />, {
      wrapper: ({ children }) => (
        <Context.Provider value={{ setCreatePostOpen: jasmine.createSpy('setCreatePostOpen') }}>
          {children}
        </Context.Provider>
      ),
    });

    const uploadInput = screen.getByLabelText(/choose file/i); // Adjusted query
    const captionTextarea = screen.getByPlaceholderText(/write a caption/i);
    const hashtagsInput = screen.getByPlaceholderText(/enter hashtags/i);
    const postButton = screen.getByText(/post/i);

    expect(uploadInput).toBeDefined(); // Use toBeDefined() from Jasmine
    expect(captionTextarea).toBeDefined();
    expect(hashtagsInput).toBeDefined();
    expect(postButton).toBeDefined();
  });

  it('should call setCreatePostOpen with false when the close button is clicked', () => {
    const setCreatePostOpen = jasmine.createSpy('setCreatePostOpen');
    render(<CreatePost />, {
      wrapper: ({ children }) => (
        <Context.Provider value={{ setCreatePostOpen }}>
          {children}
        </Context.Provider>
      ),
    });

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(setCreatePostOpen).toHaveBeenCalledWith(false);
  });
});
