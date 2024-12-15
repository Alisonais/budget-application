import { cn } from "@/lib/utils";
import { createContext, useCallback, useState } from "react";
import { Button } from "../Button";
import { useStepper } from "./useStepper";

interface IStepperContextValue {
  previousStep: () => void;
  nextStep: () => void;
};

 export const StepperContext = createContext({} as IStepperContextValue);

interface IStepperProps {
  initialStep?: number;
  steps: {
    label: string;
    content: React.ReactNode;
  }[];
};



export function Stepper({ steps, initialStep = 0 }: IStepperProps) {

  const [currentStep, setCurrentStep] = useState(initialStep);

  const previousStep = useCallback(() => {
    setCurrentStep(prevState => Math.max(0, prevState - 1));
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep(prevState => Math.min(steps.length - 1, prevState + 1));
  }, []);

  const handleChangeStep = useCallback((index:number)=> {
    setCurrentStep(index);
  }, []);

  return (
    <StepperContext.Provider value={{ previousStep, nextStep }}>
      <div className="w-full md:w-[500px] transition-all duration-1000" data-html2canvas-ignore>
        <ul className="flex flex-wrap justify-between items-center " >
          {steps.map((step, index) => (
            <li
              key={step.label}
              className={cn(
                'inline-block text-xs tracking-[-0.8px]',
                index === currentStep && 'bg-primary text-primary-foreground px-2 py-1 rounded-lg md:px-4 md:py-2 md:text-lg',
                index !== currentStep && 'bg-zinc-500 text-primary-foreground px-2 py-1 rounded-lg md:px-4 md:py-[6px] md:text-'
              )}
              onClick={()=> handleChangeStep(index)}
            >
              {step.label}
            </li>
          ))}
        </ul>

        <div className="mt-10">
          {steps[currentStep].content}
        </div>
      </div>

    </StepperContext.Provider>
  );
}

export function StepperFoter({ children }: {children: React.ReactNode}){
  return (
    <footer className="mt-6 flex justify-end gap-4" >
      {children}
    </footer>
  );
}

export function StepperPreviousButton({
  size = 'sm',
  type = 'button',
  variant = 'secondary',
  preventDefault = false,
  ...props
 }: Omit<React.ComponentPropsWithoutRef<typeof Button>, 'onClick'> & {
  preventDefault?: boolean;
 }) {
  const { previousStep } = useStepper();
  return (
    <Button
      size={size}
      variant={variant}
      type={type}
      onClick={ !preventDefault ? previousStep : undefined }
      {...props}
    >
      Voltar
    </Button>
  );
}

export function StepperNextButton({
  size = 'sm',
  type = 'button',
  preventDefault = false,
  ...props
 }: Omit<React.ComponentPropsWithoutRef<typeof Button>, 'onClick'> & {
  preventDefault?: boolean;
 }) {
  const { nextStep } = useStepper();
  return (
    <Button
      size={size}
      type={type}
      onClick={ !preventDefault ? nextStep : undefined }
      {...props}
    >
      Proximo
    </Button>
  );
}
