import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PopupForm from './PopupForm';

describe('PopupForm', () => {
  it('renders the form', () => {
    render(<PopupForm />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/terms and conditions/i)).toBeInTheDocument();
  });

  it('submits the form', async () => {
    render(<PopupForm />);
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '1234567890' } });
    fireEvent.click(screen.getByLabelText(/terms and conditions/i));
    fireEvent.click(screen.getByText(/submit/i));

    expect(await screen.findByText('Form submitted successfully')).toBeInTheDocument();
  });
});
