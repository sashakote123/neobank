import { fireEvent, render, screen } from '@testing-library/react';

import QuestionItem from './QuestionItem';

describe('QuestionItem', () => {
  const mockQuestion = {
    question: 'How do I open a new account?',
    answer: 'You can open a new account online or at any branch location.',
  };

  const mockOnToggle = jest.fn();

  test('Компонент отрисован с корректными элементами', () => {
    render(<QuestionItem question={mockQuestion} isOpen={false} onToggle={mockOnToggle} />);

    expect(screen.getByText(mockQuestion.question)).toBeInTheDocument();
    expect(screen.getByText(mockQuestion.answer)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('Вызывает onToggle при клике на кнопку', () => {
    render(<QuestionItem question={mockQuestion} isOpen={false} onToggle={mockOnToggle} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });

  test('Иконка меняет направление при открытии/закрытии', () => {
    const { rerender } = render(
      <QuestionItem question={mockQuestion} isOpen={false} onToggle={mockOnToggle} />
    );

    const icon = screen.getByAltText('open');
    expect(icon).toHaveStyle('transform: rotate(0)');

    rerender(<QuestionItem question={mockQuestion} isOpen={true} onToggle={mockOnToggle} />);

    expect(icon).toHaveStyle('transform: rotate(180deg)');
  });

  test('Применяет правильные классы стилей', () => {
    const { rerender } = render(
      <QuestionItem question={mockQuestion} isOpen={false} onToggle={mockOnToggle} />
    );

    const questionElement = screen.getByText(mockQuestion.question);
    expect(questionElement).toHaveClass('clampText');

    rerender(<QuestionItem question={mockQuestion} isOpen={true} onToggle={mockOnToggle} />);

    expect(questionElement).not.toHaveClass('clampText');
  });
});
