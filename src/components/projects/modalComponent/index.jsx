import React, { useState } from 'react';
import AdvancedModal from './AdvancedModal';
import styled from 'styled-components';

const Button = styled.button`
    padding: 5px 15px;
`;

const ModalComponent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (<>
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Modal</h1>

        <div>
            <div style={{ display: "flex", gap: "15px", justifyContent: "center", alignItems: "center" }}>
                <span>click this button to open th emodal</span>
                <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
            </div>

            <AdvancedModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Advanced Modal Example"
                size="large"
                closeOnBackdropClick
                closeOnEscape
                ariaLabelledby="modal-title"
                ariaDescribedby="modal-description"
                footerContent={
                    <>
                        <Button onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={() => alert('Confirmed!')}>
                            Confirm
                        </Button>
                    </>
                }
            >
                <div id="modal-description">
                    <p>This is an advanced modal component with:</p>
                    <ul>
                        <li>Animations</li>
                        <li>Accessibility features</li>
                        <li>Flexible sizing options</li>
                        <li>Customizable footer</li>
                        <li>Escape key and backdrop closing</li>
                    </ul>
                </div>
            </AdvancedModal>
        </div>
    </>
    );
};

export default ModalComponent;
