import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dropdown, DropdownItem, DropdownDivider, DropdownHeader } from './Dropdown';

describe('Dropdown Component', () => {
  test('renders dropdown trigger correctly', () => {
    render(
      <Dropdown trigger={<button>Open Menu</button>}>
        <DropdownItem>Item 1</DropdownItem>
      </Dropdown>
    );
    
    expect(screen.getByText('Open Menu')).toBeInTheDocument();
  });

  test('dropdown menu is hidden by default', () => {
    render(
      <Dropdown trigger={<button>Open Menu</button>}>
        <DropdownItem>Item 1</DropdownItem>
      </Dropdown>
    );
    
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  test('clicking trigger opens the dropdown', () => {
    render(
      <Dropdown trigger={<button>Open Menu</button>}>
        <DropdownItem>Item 1</DropdownItem>
      </Dropdown>
    );
    
    fireEvent.click(screen.getByText('Open Menu'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByRole('menuitem')).toHaveTextContent('Item 1');
  });

  test('clicking outside closes the dropdown', () => {
    render(
      <>
        <div data-testid="outside">Outside Area</div>
        <Dropdown trigger={<button>Open Menu</button>}>
          <DropdownItem>Item 1</DropdownItem>
        </Dropdown>
      </>
    );
    
    // Open dropdown
    fireEvent.click(screen.getByText('Open Menu'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    
    // Click outside
    fireEvent.mouseDown(screen.getByTestId('outside'));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  test('aligns dropdown to the right when specified', () => {
    render(
      <Dropdown trigger={<button>Open Menu</button>} align="right">
        <DropdownItem>Item 1</DropdownItem>
      </Dropdown>
    );
    
    fireEvent.click(screen.getByText('Open Menu'));
    const menu = screen.getByRole('menu');
    expect(menu).toHaveClass('right-0');
    expect(menu).not.toHaveClass('left-0');
  });

  test('aligns dropdown to the left by default', () => {
    render(
      <Dropdown trigger={<button>Open Menu</button>}>
        <DropdownItem>Item 1</DropdownItem>
      </Dropdown>
    );
    
    fireEvent.click(screen.getByText('Open Menu'));
    const menu = screen.getByRole('menu');
    expect(menu).toHaveClass('left-0');
    expect(menu).not.toHaveClass('right-0');
  });

  test('applies custom className to the dropdown container', () => {
    render(
      <Dropdown trigger={<button>Open Menu</button>} className="custom-container-class">
        <DropdownItem>Item 1</DropdownItem>
      </Dropdown>
    );
    
    const container = screen.getByText('Open Menu').closest('div');
    expect(container).toHaveClass('custom-container-class');
  });

  test('applies custom dropdownClassName to the menu', () => {
    render(
      <Dropdown trigger={<button>Open Menu</button>} dropdownClassName="custom-menu-class">
        <DropdownItem>Item 1</DropdownItem>
      </Dropdown>
    );
    
    fireEvent.click(screen.getByText('Open Menu'));
    expect(screen.getByRole('menu')).toHaveClass('custom-menu-class');
  });

  // DropdownItem tests
  test('renders dropdown item correctly', () => {
    render(
      <Dropdown trigger={<button>Open Menu</button>}>
        <DropdownItem>Item 1</DropdownItem>
      </Dropdown>
    );
    
    fireEvent.click(screen.getByText('Open Menu'));
    expect(screen.getByRole('menuitem')).toHaveTextContent('Item 1');
  });

  test('dropdown item calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(
      <Dropdown trigger={<button>Open Menu</button>}>
        <DropdownItem onClick={handleClick}>Clickable Item</DropdownItem>
      </Dropdown>
    );
    
    fireEvent.click(screen.getByText('Open Menu'));
    fireEvent.click(screen.getByText('Clickable Item'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('disabled dropdown item does not call onClick handler', () => {
    const handleClick = jest.fn();
    render(
      <Dropdown trigger={<button>Open Menu</button>}>
        <DropdownItem onClick={handleClick} disabled>Disabled Item</DropdownItem>
      </Dropdown>
    );
    
    fireEvent.click(screen.getByText('Open Menu'));
    fireEvent.click(screen.getByText('Disabled Item'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('disabled dropdown item has disabled styles', () => {
    render(
      <Dropdown trigger={<button>Open Menu</button>}>
        <DropdownItem disabled>Disabled Item</DropdownItem>
      </Dropdown>
    );
    
    fireEvent.click(screen.getByText('Open Menu'));
    expect(screen.getByRole('menuitem')).toHaveClass('opacity-50');
    expect(screen.getByRole('menuitem')).toHaveClass('cursor-not-allowed');
  });

  // DropdownDivider tests
  test('renders dropdown divider correctly', () => {
    render(
      <Dropdown trigger={<button>Open Menu</button>}>
        <DropdownItem>Item 1</DropdownItem>
        <DropdownDivider />
        <DropdownItem>Item 2</DropdownItem>
      </Dropdown>
    );
    
    fireEvent.click(screen.getByText('Open Menu'));
    expect(screen.getByRole('menu').querySelector('hr')).toBeInTheDocument();
    expect(screen.getByRole('menu').querySelector('hr')).toHaveClass('border-t');
    expect(screen.getByRole('menu').querySelector('hr')).toHaveClass('border-matrix-border');
  });

  // DropdownHeader tests
  test('renders dropdown header correctly', () => {
    render(
      <Dropdown trigger={<button>Open Menu</button>}>
        <DropdownHeader>Section Title</DropdownHeader>
        <DropdownItem>Item 1</DropdownItem>
      </Dropdown>
    );
    
    fireEvent.click(screen.getByText('Open Menu'));
    expect(screen.getByText('Section Title')).toBeInTheDocument();
    expect(screen.getByText('Section Title')).toHaveClass('text-xs');
    expect(screen.getByText('Section Title')).toHaveClass('uppercase');
  });

  test('applies custom className to dropdown header', () => {
    render(
      <Dropdown trigger={<button>Open Menu</button>}>
        <DropdownHeader className="custom-header-class">Section Title</DropdownHeader>
      </Dropdown>
    );
    
    fireEvent.click(screen.getByText('Open Menu'));
    expect(screen.getByText('Section Title')).toHaveClass('custom-header-class');
  });
});