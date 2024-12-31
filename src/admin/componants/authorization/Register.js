import React, { useEffect, useState } from 'react';
import { Stepper, Step } from 'react-form-stepper';

// import '../../assets/css/style.css'
// import '../../assets/css/registry.css'

function Register() {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div>
            <Stepper activeStep={activeStep}>
                <Step label="Step 1" />
                <Step label="Step 2" />
                <Step label="Step 3" />
            </Stepper>

            {activeStep === 0 && (
                <div className="step-content">
                    <h3>Step 1</h3>
                    <input type="email" placeholder="Email" required />
                    <input type="tel" placeholder="Mobile No" required />
                    <input type="password" placeholder="Password" required />
                </div>
            )}

            {activeStep === 1 && (
                <>djfvnjkdnfndpo</>
            )}

            {activeStep === 2 && (
                <div className="step-content">
                    <h3>Step 3</h3>
                    <input type="file" required />
                    <div>
                        <input type="checkbox" id="agree" required />
                        <label htmlFor="agree">Agree to terms and conditions</label>
                    </div>
                </div>
            )}

            <div className="step-buttons">
                {activeStep !== 0 && (
                    <button onClick={handleBack}>Back</button>
                )}
                {activeStep < 2 ? (
                    <button onClick={handleNext}>Next</button>
                ) : (
                    <button onClick={handleReset}>Finish</button>
                )}
            </div>
        </div>
    );
}

export default Register;