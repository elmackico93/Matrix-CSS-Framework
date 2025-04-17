import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs, TabList, Tab, TabPanel } from './Tabs';

describe('Tabs Component', () => {
  const renderTabs = (defaultTab?: string) => {
    return render(
      <Tabs defaultTab={defaultTab}>
        <TabList>
          <Tab id="tab1">Tab 1</Tab>
          <Tab id="tab2">Tab 2</Tab>
          <Tab id="tab3">Tab 3</Tab>
        </TabList>
        <TabPanel id="tab1">Content for tab 1</TabPanel>
        <TabPanel id="tab2">Content for tab 2</TabPanel>
        <TabPanel id="tab3">Content for tab 3</TabPanel>
      </Tabs>
    );
  };

  test('renders the tabs component', () => {
    renderTabs();
    
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });

  test('selects the first tab by default when no defaultTab is provided', () => {
    renderTabs();
    
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
    expect(tabs[2]).toHaveAttribute('aria-selected', 'false');
    
    expect(screen.getByText('Content for tab 1')).toBeInTheDocument();
    expect(screen.queryByText('Content for tab 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Content for tab 3')).not.toBeInTheDocument();
  });

  test('selects the specified tab when defaultTab is provided', () => {
    renderTabs('tab2');
    
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[2]).toHaveAttribute('aria-selected', 'false');
    
    expect(screen.queryByText('Content for tab 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content for tab 2')).toBeInTheDocument();
    expect(screen.queryByText('Content for tab 3')).not.toBeInTheDocument();
  });

  test('changes tab when a tab is clicked', () => {
    renderTabs();
    
    // Initially tab 1 is selected
    expect(screen.getByText('Content for tab 1')).toBeInTheDocument();
    
    // Click on tab 2
    fireEvent.click(screen.getByText('Tab 2'));
    
    // Now tab 2 should be selected
    expect(screen.queryByText('Content for tab 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content for tab 2')).toBeInTheDocument();
    
    // Click on tab 3
    fireEvent.click(screen.getByText('Tab 3'));
    
    // Now tab 3 should be selected
    expect(screen.queryByText('Content for tab 2')).not.toBeInTheDocument();
    expect(screen.getByText('Content for tab 3')).toBeInTheDocument();
  });

  test('applies correct active styles to selected tab', () => {
    renderTabs();
    
    const tab1 = screen.getByText('Tab 1').closest('button');
    const tab2 = screen.getByText('Tab 2').closest('button');
    
    // Tab 1 is initially active
    expect(tab1).toHaveClass('border-matrix-text-bright');
    expect(tab1).toHaveClass('text-matrix-text-bright');
    expect(tab2).not.toHaveClass('border-matrix-text-bright');
    expect(tab2).not.toHaveClass('text-matrix-text-bright');
    
    // Click on tab 2
    fireEvent.click(tab2!);
    
    // Now tab 2 should have active styles
    expect(tab1).not.toHaveClass('border-matrix-text-bright');
    expect(tab1).not.toHaveClass('text-matrix-text-bright');
    expect(tab2).toHaveClass('border-matrix-text-bright');
    expect(tab2).toHaveClass('text-matrix-text-bright');
  });

  test('sets correct ARIA attributes', () => {
    renderTabs();
    
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('id', 'tab-tab1');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[0]).toHaveAttribute('tabIndex', '0');
    
    expect(tabs[1]).toHaveAttribute('id', 'tab-tab2');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
    expect(tabs[1]).toHaveAttribute('tabIndex', '-1');
    
    const tabPanel = screen.getByRole('tabpanel');
    expect(tabPanel).toHaveAttribute('aria-labelledby', 'tab-tab1');
    expect(tabPanel).toHaveAttribute('id', 'tabpanel-tab1');
  });

  test('accepts and applies custom className to components', () => {
    render(
      <Tabs className="custom-tabs-class">
        <TabList className="custom-tablist-class">
          <Tab id="tab1" className="custom-tab-class">Tab 1</Tab>
          <Tab id="tab2">Tab 2</Tab>
        </TabList>
        <TabPanel id="tab1" className="custom-tabpanel-class">Content for tab 1</TabPanel>
        <TabPanel id="tab2">Content for tab 2</TabPanel>
      </Tabs>
    );
    
    expect(screen.getByRole('tablist').parentElement).toHaveClass('custom-tabs-class');
    expect(screen.getByRole('tablist')).toHaveClass('custom-tablist-class');
    expect(screen.getByText('Tab 1')).toHaveClass('custom-tab-class');
    expect(screen.getByRole('tabpanel')).toHaveClass('custom-tabpanel-class');
  });
});