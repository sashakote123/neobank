import { render, screen } from '@testing-library/react';

import ContactInformationForms from './ContactInformationForms';

jest.mock('./data', () => {
  const mockInputs = [
    {
      name: 'email',
      title: 'Email',
      type: 'input',
      placeholder: 'Enter email',
      required: true,
      errorAlert: 'Invalid email',
      requiredAlert: 'Email is required',
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'input',
      placeholder: 'Enter phone number',
      required: true,
      errorAlert: 'Invalid phone',
      requiredAlert: 'Phone is required',
    },
  ];
  return mockInputs;
});

jest.mock('@/src/entities/uniInput/UniInput', () => {
  return ({ item }) => (
    <div data-testid={`uni-input-${item.name}`}>Mock UniInput: {item.title}</div>
  );
});

describe('ContactInformationForms', () => {
  test('Компонент отрисовывает заголовок', () => {
    render(<ContactInformationForms />);
    expect(screen.getByText('Contact Information')).toBeInTheDocument();
  });

  test('Компонент отрисовывает контейнер форм', () => {
    render(<ContactInformationForms />);
    expect(screen.getByTestId('contactForms')).toBeInTheDocument();
    expect(screen.getByTestId('contactForms')).toHaveClass('forms');
  });

  test('Компонент отрисовывает правильное количество UniInput компонентов', () => {
    render(<ContactInformationForms />);
    const inputs = screen.getAllByTestId(/uni-input-/);
    expect(inputs.length).toBe(2);
  });

  test('Применяются правильные CSS классы', () => {
    render(<ContactInformationForms />);

    expect(screen.getByTestId('contactForms')).toHaveClass('forms');
    expect(screen.getByText('Contact Information')).toHaveClass('sectionTitle');
    expect(screen.getByTestId('infoForm')).toBeInTheDocument();
  });
});
