import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from './Modal';

// Mock timers for animation delays
jest.useFakeTimers();

describe('Modal Component', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  test('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        Modal Content
      </Modal>
    );
    
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  test('renders when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        Modal Content
      </Modal>
    );
    
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        Modal Content
      </Modal>
    );
    
    fireEvent.click(screen.getByLabelText('Close modal'));
    act(() => {
      jest.advanceTimersByTime(300); // Wait for animation
    });
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when backdrop is clicked', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        Modal Content
      </Modal>
    );
    
    // Find the backdrop - the parent element of the modal dialog
    const backdrop = screen.getByRole('dialog').parentElement;
    if (backdrop) {
      fireEvent.click(backdrop);
      act(() => {
        jest.advanceTimersByTime(300); // Wait for animation
      });
      
      expect(handleClose).toHaveBeenCalledTimes(1);
    }
  });

  test('does not call onClose when content is clicked', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        Modal Content
      </Modal>
    );
    
    fireEvent.click(screen.getByText('Modal Content'));
    act(() => {
      jest.advanceTimersByTime(300); // Wait for animation
    });
    
    expect(handleClose).not.toHaveBeenCalled();
  });

  test('does not call onClose when backdrop is clicked with closeOnBackdropClick=false', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} closeOnBackdropClick={false}>
        Modal Content
      </Modal>
    );
    
    const backdrop = screen.getByRole('dialog').parentElement;
    if (backdrop) {
      fireEvent.click(backdrop);
      act(() => {
        jest.advanceTimersByTime(300); // Wait for animation
      });
      
      expect(handleClose).not.toHaveBeenCalled();
    }
  });

  test('does not show close button when showCloseButton=false', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} showCloseButton={false}>
        Modal Content
      </Modal>
    );
    
    expect(screen.queryByLabelText('Close modal')).not.toBeInTheDocument();
  });

  test('calls onClose when Escape key is pressed', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        Modal Content
      </Modal>
    );
    
    fireEvent.keyDown(window, { key: 'Escape' });
    act(() => {
      jest.advanceTimersByTime(300); // Wait for animation
    });
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('applies custom className to modal', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} className="custom-modal-class">
        Modal Content
      </Modal>
    );
    
    expect(screen.getByRole('dialog')).toHaveClass('custom-modal-class');
  });

  test('renders ModalHeader component correctly', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <ModalHeader>Modal Title</ModalHeader>
      </Modal>
    );
    
    const header = screen.getByText('Modal Title').closest('div');
    expect(header).toHaveClass('border-b');
    expect(header).toHaveClass('border-matrix-border');
  });

  test('renders ModalBody component correctly', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <ModalBody>Modal Body Content</ModalBody>
      </Modal>
    );
    
    const body = screen.getByText('Modal Body Content').closest('div');
    expect(body).toHaveClass('p-4');
  });

  test('renders ModalFooter component correctly', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <ModalFooter>
          <button>Cancel</button>
          <button>Confirm</button>
        </ModalFooter>
      </Modal>
    );
    
    const footer = screen.getByText('Cancel').closest('div');
    expect(footer).toHaveClass('border-t');
    expect(footer).toHaveClass('border-matrix-border');
    expect(footer).toHaveClass('flex');
    expect(footer).toHaveClass('justify-end');
  });

  test('renders complete modal with all sections', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalBody>Modal Content</ModalBody>
        <ModalFooter>
          <button>Action</button>
        </ModalFooter>
      </Modal>
    );
    
    expect(screen.getByText('Modal Title')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
  });
});