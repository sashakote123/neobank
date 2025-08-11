import { FormProvider, useForm } from 'react-hook-form';

import { render, screen } from '@testing-library/react';

import UniInput from './UniInput';

describe('UniInput', () => {
  const mockInputItem = {
    name: 'email',
    title: 'Email',
    type: 'input',
    placeholder: 'Enter email',
    required: true,
    errorAlert: 'Invalid email',
    requiredAlert: 'Email is required',
  };

  const mockCalendarItem = {
    name: 'birthDate',
    title: 'Date of Birth',
    type: 'calendar',
    placeholder: 'DD.MM.YYYY',
    required: true,
    errorAlert: 'Invalid date',
    requiredAlert: 'Date is required',
  };

  const mockSelectorItem = {
    name: 'gender',
    title: 'Gender',
    type: 'selector',
    placeholder: 'Select gender',
    required: true,
    errorAlert: 'Please select gender',
    requiredAlert: 'Gender is required',
    selectorArray: ['Male', 'Female'],
  };

  const Wrapper = ({ item }) => {
    const methods = useForm();
    return (
      <FormProvider {...methods}>
        <UniInput item={item} />
      </FormProvider>
    );
  };

  test("Отрисовывает SimpleInput для type='input'", () => {
    render(<Wrapper item={mockInputItem} />);
    expect(screen.getByPlaceholderText(mockInputItem.placeholder)).toBeInTheDocument();
    expect(screen.getByText(mockInputItem.title)).toBeInTheDocument();
  });

  test("Отрисовывает CalendarInput для type='calendar'", () => {
    render(<Wrapper item={mockCalendarItem} />);
    expect(screen.getByPlaceholderText(mockCalendarItem.placeholder)).toBeInTheDocument();
    expect(screen.getByText(mockCalendarItem.title)).toBeInTheDocument();
    expect(screen.getByAltText('calendar')).toBeInTheDocument();
  });

  test("Отрисовывает SelectFromForm для type='selector'", () => {
    render(<Wrapper item={mockSelectorItem} />);

    expect(screen.getByText(mockSelectorItem.title)).toBeInTheDocument();

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();

    mockSelectorItem.selectorArray?.forEach((option) => {
      expect(screen.getByText(option.toString())).toBeInTheDocument();
    });
  });

  test('Не отрисовывает ничего для неизвестного типа', () => {
    render(<Wrapper item={{ ...mockInputItem, type: 'unknown' }} />);

    expect(screen.queryByText(mockInputItem.title)).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText(mockInputItem.placeholder)).not.toBeInTheDocument();
  });
});
