import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import MainBtn from './MainBtn';

describe('MainBtn', () => {
  test('Компонент отрисован с корректными элементами', () => {
    render(<MainBtn title="Button" />);
    const btn = screen.getByTestId('mainBtn');

    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent('Button');
  });

  test('Уменьшенный компонент отрисован с корректными элементами', () => {
    render(<MainBtn title="Button" small />);
    const btn = screen.getByTestId('mainBtn');

    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent('Button');
    expect(btn).toHaveClass('small');
  });

  test('Компонент наследует стандартные атрибуты button', () => {
    render(
      <MainBtn
        title="Test Button"
        type="submit"
        disabled
        aria-label="Test button"
        form="test-form"
      />
    );

    const btn = screen.getByTestId('mainBtn');

    expect(btn).toHaveAttribute('type', 'submit');
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('aria-label', 'Test button');
    expect(btn).toHaveAttribute('form', 'test-form');
  });

  test('Компонент корректно обрабатывает события', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();

    render(
      <MainBtn title="Click me" onClick={handleClick} onFocus={handleFocus} onBlur={handleBlur} />
    );

    const btn = screen.getByTestId('mainBtn');

    await user.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);

    await user.tab();
    expect(handleFocus).toHaveBeenCalledTimes(1);

    await user.tab();
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });
});
