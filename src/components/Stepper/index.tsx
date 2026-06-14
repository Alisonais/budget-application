import { cn } from "@/utils/utils";
import { AnimatePresence, motion } from "motion/react";
import { createContext, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { ModalDialog } from "../ModalDialog";
import { useStepper } from "./useStepper";
interface IStepperContextValue {
  previousStep: () => void;
  nextStep: () => void;
  handleChangeStep: (index: number) => void;
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

  const handleChangeStep = useCallback((index: number) => {
    setCurrentStep(index);
  }, []);

  return (
    <StepperContext.Provider value={{ previousStep, nextStep, handleChangeStep }}>
      <div className="w-full md:w-[500px] transition-all duration-1000" data-html2canvas-ignore>
        <ul className="flex flex-wrap justify-between items-center " >
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            return (
              <li
                key={step.label}
                className={cn(
                  'relative inline-block px-2 py-1 rounded-md cursor-pointer text-xs tracking-[-0.8px] transition-colors duration-500',
                  isActive && 'text-primary-foreground'
                )}
                onClick={() => handleChangeStep(index)}
              >
                {String(index + 1).padStart(2, '0')}. {step.label}
                {isActive && <motion.div layoutId="selectedTab" className="-z-10 bg-primary rounded-md absolute inset-0" />}
              </li>
            )

          })}
        </ul>

        <AnimatePresence mode="wait" initial={false} >
          <motion.div
            key={currentStep}
            initial={{ translateX: '250px', opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            exit={{ translateX: '-250px', opacity: 0 }}
            transition={{
              duration: 0.3,
              type: "spring",
            }}
            className="w-[380px] md:w-[500px]"
          >
            {steps[currentStep].content}
          </motion.div>
        </AnimatePresence>
      </div>

    </StepperContext.Provider>
  );
}

export function StepperFoter({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  function handleHome() {
    localStorage.removeItem('formValues');
    navigate('/budgets', { replace: true });
    // window.history.replaceState({}, 'formValues');
    // window.location.reload();
  }
  return (
    <motion.footer
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="mt-6 flex justify-between gap-4"
    >
      <ModalDialog variant="default" title="Home" description="Voltar para listagem de orçamentos">
        <Button type="button" onClick={handleHome}>Listar orçamentos</Button>
      </ModalDialog>
      <div className="flex justify-end gap-2">
        {children}
      </div>
    </motion.footer>
  );
}

export function StepperPreviousButton({
  size = 'sm',
  type = 'button',
  variant = 'secondary',
  onClick,
  ...props
}: React.ComponentPropsWithoutRef<typeof Button>) {
  const { previousStep } = useStepper();
  return (
    <Button
      size={size}
      variant={variant}
      type={type}
      onClick={onClick ?? previousStep}
      {...props}
    >
      Voltar
    </Button>
  );
}

export function StepperNextButton({
  size = 'sm',
  type = 'button',
  onClick,
  ...props
}: React.ComponentPropsWithoutRef<typeof Button>) {
  const { nextStep } = useStepper();
  return (
    <Button
      size={size}
      type={type}
      onClick={onClick ?? nextStep}
      {...props}
    >
      Proximo
    </Button>
  );
}
