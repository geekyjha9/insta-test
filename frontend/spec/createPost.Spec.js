import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import CreatePost from '../src/components/CreatePost/CreatePost';
import Modal from 'react-modal';

describe('CreatePost component tests', () => {
  let container;
  let closeModal;

  beforeEach(() => {
    // Create a div with id 'root' and append it to the document body
    const root = document.createElement('div');
    root.setAttribute('id', 'root');
    document.body.appendChild(root);

    // Set the app element to the newly created div
    Modal.setAppElement(root);

    closeModal = jasmine.createSpy('closeModal');
    container = render(<CreatePost closeModal={closeModal} />);
  });

  afterEach(() => {
    cleanup();
    // Remove the 'root' element after each test
    const root = document.getElementById('root');
    if (root) {
      document.body.removeChild(root);
    }
  });

  it('[REQ018]_should_render_the_CreatePost_component_correctly', () => {
    const { getByPlaceholderText, getByText } = container;

    expect(getByText('Create Post')).toBeTruthy();
    expect(getByPlaceholderText('Add a caption')).toBeTruthy();
    expect(getByPlaceholderText('Add hashtags')).toBeTruthy();
  });

  it('[REQ019]_should_call_handleShare_and_closeModal_when_the_Share_button_is_clicked', () => {
    const { getByText, getByPlaceholderText } = container;

    const captionInput = getByPlaceholderText('Add a caption');
    const hashtagsInput = getByPlaceholderText('Add hashtags');
    const shareButton = getByText('Share');

    fireEvent.change(captionInput, { target: { value: 'Test Caption' } });
    fireEvent.change(hashtagsInput, { target: { value: '#test' } });
    fireEvent.click(shareButton);

    expect(closeModal).toHaveBeenCalled();
  });
});
