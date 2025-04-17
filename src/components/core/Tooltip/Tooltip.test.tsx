import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Tooltip } from './Tooltip';

// We need to mock timers for the delay functionality
jest.useFakeTimers();

describe('Tooltip Component', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  test('renders the trigger element', () => {
    render(
      <Tooltip content="Tooltip Text">
        <button>Hover Me</button>
      </Tooltip>
    );
    
    expect(screen.getByText('Hover Me')).toBeInTheDocument();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  test('shows tooltip on hover after delay', () => {
    render(
      <Tooltip content="Tooltip Text" delay={200}>
        <button>Hover Me</button>
      </Tooltip>
    );
    
    // Hover over the button
    fireEvent.mouseEnter(screen.getByText('Hover Me'));
    
    // Tooltip should not be visible immediately
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    
    // Fast-forward time by the delay amount
    act(() => {
      jest.advanceTimersByTime(200);
    });
    
    // Now tooltip should be visible
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    expect(screen.getByText('Tooltip Text')).toBeInTheDocument();
  });

  test('hides tooltip on mouse leave', () => {
    render(
      <Tooltip content="Tooltip Text" delay={0}>
        <button>Hover Me</button>
      </Tooltip>
    );
    
    // Show the tooltip
    fireEvent.mouseEnter(screen.getByText('Hover Me'));
    act(() => {
      jest.advanceTimersByTime(0);
    });
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    
    // Hide the tooltip
    fireEvent.mouseLeave(screen.getByText('Hover Me'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  test('shows tooltip on focus', () => {
    render(
      <Tooltip content="Tooltip Text" delay={0}>
        <button>Focus Me</button>
      </Tooltip>
    );
    
    // Focus the button
    fireEvent.focus(screen.getByText('Focus Me'));
    act(() => {
      jest.advanceTimersByTime(0);
    });
    
    // Tooltip should be visible
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  test('hides tooltip on blur', () => {
    render(
      <Tooltip content="Tooltip Text" delay={0}>
        <button>Focus Me</button>
      </Tooltip>
    );
    
    // Show the tooltip via focus
    fireEvent.focus(screen.getByText('Focus Me'));
    act(() => {
      jest.advanceTimersByTime(0);
    });
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    
    // Hide the tooltip via blur
    fireEvent.blur(screen.getByText('Focus Me'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  test('clears timeout when component unmounts', () => {
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
    
    const { unmount } = render(
      <Tooltip content="Tooltip Text" delay={500}>
        <button>Hover Me</button>
      </Tooltip>
    );
    
    // Start showing the tooltip
    fireEvent.mouseEnter(screen.getByText('Hover Me'));
    
    // Unmount before tooltip appears
    unmount();
    
    // Should have cleared the timeout
    expect(clearTimeoutSpy).toHaveBeenCalled();
    
    clearTimeoutSpy.mockRestore();
  });

  test('applies different positioning classes based on position prop', () => {
    const positions = ['top', 'right', 'bottom', 'left'] as const;
    
    positions.forEach(position => {
      const { unmount } = render(
        <Tooltip content="Tooltip Text" position={position} delay={0}>
          <button>Hover Me</button>
        </Tooltip>
      );
      
      // Show the tooltip
      fireEvent.mouseEnter(screen.getByText('Hover Me'));
      act(() => {
        jest.advanceTimersByTime(0);
      });
      
      const tooltip = screen.getByRole('tooltip');
      
      // Check the positioning class
      if (position === 'top') {
        expect(tooltip).toHaveClass('-translate-y-full');
        expect(tooltip).toHaveClass('bottom-[calc(100%+5px)]');
      } else if (position === 'right') {
        expect(tooltip).toHaveClass('translate-x-[5px]');
        expect(tooltip).toHaveClass('left-full');
      } else if (position === 'bottom') {
        expect(tooltip).toHaveClass('translate-y-[5px]');
        expect(tooltip).toHaveClass('top-full');
      } else if (position === 'left') {
        expect(tooltip).toHaveClass('-translate-x-full');
        expect(tooltip).toHaveClass('right-[calc(100%+5px)]');
      }
      
      unmount();
    });
  });

  test('applies custom className to tooltip', () => {
    render(
      <Tooltip content="Tooltip Text" className="custom-tooltip-class" delay={0}>
        <button>Hover Me</button>
      </Tooltip>
    );
    
    // Show the tooltip
    fireEvent.mouseEnter(screen.getByText('Hover Me'));
    act(() => {
      jest.advanceTimersByTime(0);
    });
    
    expect(screen.getByRole('tooltip')).toHaveClass('custom-tooltip-class');
  });

  test('can display React element as content', () => {
    render(
      <Tooltip 
        content={<div><strong>Bold Text</strong> and <em>italic text</em></div>}
        delay={0}
      >
        <button>Hover Me</button>
      </Tooltip>
    );
    
    // Show the tooltip
    fireEvent.mouseEnter(screen.getByText('Hover Me'));
    act(() => {
      jest.advanceTimersByTime(0);
    });
    
    expect(screen.getByText('Bold Text')).toBeInTheDocument();
    expect(screen.getByText('italic text')).toBeInTheDocument();
  });
});