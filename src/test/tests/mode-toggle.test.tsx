import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ModeToggle } from '@/components/mode-toggle';
import { TooltipProvider } from '@/components/ui/tooltip';

// Mock the theme provider hook
const setTheme = vi.fn();
const theme = 'light';
vi.mock('@/components/theme-provider', () => ({
  useTheme: () => ({ setTheme, theme }),
}));

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<TooltipProvider>{ui}</TooltipProvider>);
};

describe('ModeToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders button with accessible name', () => {
    renderWithProviders(<ModeToggle />);
    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
  });

  it('calls setTheme with toggled theme when clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ModeToggle />);

    const toggleThemeButton = screen.getByRole('button', {
      name: /toggle theme/i,
    });

    await user.click(toggleThemeButton);

    expect(setTheme).toHaveBeenCalledWith('dark');
  });
});
