import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jasmine-dom';
import AppLayout from '../src/pages/AppLayout';
import LogoutModal from '../src/components/LogOut/LogOut';
import { AuthProvider } from '../src/context/AuthContext';
import Modal from 'react-modal';

// Ensure Modal is set up correctly
const setupModal = () => {
  // Create a div with id 'root' and append it to the document body
  const root = document.createElement('div');
  root.setAttribute('id', 'root');
  document.body.appendChild(root);

  // Set the app element to the newly created div
  Modal.setAppElement(root);

  return root;
};

describe('AppLayout Component', () => {
  let closeModal;
  let container;

  beforeEach(() => {
    // Set up the modal app element
    setupModal();

    closeModal = jasmine.createSpy('closeModal');

    // Render the AppLayout with the mock context
    container = render(
      <AuthProvider value={{ logout: jasmine.createSpy('logout') }}>
        <AppLayout />
      </AuthProvider>
    );
  });

  afterEach(() => {
    cleanup();
    // Remove the 'root' element after each test
    const root = document.getElementById('root');
    if (root) {
      document.body.removeChild(root);
    }
  });

  it('[REQ0033]_shows_logout_modal_after_logout_button_click', async () => {
    // Click the logout button
    const logoutButton = screen.getByText('Log Out');
    fireEvent.click(logoutButton);

    // Check if the LogoutModal is rendered
    await waitFor(() => {
      const modalTitle = screen.getByText('Confirm Logout');
      expect(modalTitle).toBeTruthy();
    });
  });
});
