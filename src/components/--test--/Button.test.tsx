
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "../Button";
const textMock = 'text mock';
const varientMock = 'outline';


describe("test button",()=>{
  beforeEach(() => [
    render(<Button variant={varientMock}>{textMock}</Button> )
  ]);

  it('test render', ()=> {
    expect(screen.getByText('text mock')).toBeDefined();
  })

  it('test render variant', () => {
    expect(screen.getByText(textMock)).toBeInTheDocument();
    fireEvent.blur(screen.getByText(textMock));
  })

  it('test render click', () => {
    expect(fireEvent.click(screen.getByText('textMock2'))).toBeDefined;
    ;
  })
});
