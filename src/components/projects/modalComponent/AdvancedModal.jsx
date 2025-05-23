import React, { useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const slideIn = keyframes`
  from { transform: translateY(20px); }
  to { transform: translateY(0); }
`;

const slideOut = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(20px); }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out forwards;
  
  ${({ $isClosing }) => $isClosing && css`
    animation: ${fadeOut} 0.3s ease-out forwards;
  `}
`;

const ModalContainer = styled.div`
  background: ${({ theme }) => theme.modalBackground || '#fff'};
  border-radius: ${({ theme }) => theme.modalBorderRadius || '8px'};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  width: ${({ width }) => width || '90%'};
  max-width: ${({ maxWidth }) => maxWidth || '600px'};
  max-height: 90vh;
  overflow-y: auto;
  animation: ${slideIn} 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  
  ${({ $isClosing }) => $isClosing && css`
    animation: ${slideOut} 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  `}

  ${({ size }) => size === 'small' && css`
    max-width: 400px;
  `}

  ${({ size }) => size === 'large' && css`
    max-width: 800px;
  `}

  ${({ fullHeight }) => fullHeight && css`
    height: 90vh;
  `}
`;

const ModalHeader = styled.div`
  padding: 1.5rem 1.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.modalTitleColor || '#333'};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.modalCloseColor || '#999'};
  transition: color 0.2s;
  
  &:hover {
    color: ${({ theme }) => theme.modalCloseHoverColor || '#333'};
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
`;

const ModalFooter = styled.div`
  padding: 0 1.5rem 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const AdvancedModal = ({
    isOpen,
    onClose,
    title,
    children,
    footerContent,
    size,
    width,
    maxWidth,
    fullHeight,
    closeOnBackdropClick = true,
    closeOnEscape = true,
    showCloseButton = true,
    ariaLabelledby,
    ariaDescribedby,
}) => {
    const modalRef = useRef(null);
    const [isClosing, setIsClosing] = React.useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            modalRef.current?.focus();
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    useEffect(() => {
        if (!closeOnEscape) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen && !isClosing) {
                handleClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, isClosing, closeOnEscape]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 300); // Match this with your animation duration
    };

    const handleBackdropClick = (e) => {
        if (closeOnBackdropClick && e.target === e.currentTarget) {
            handleClose();
        }
    };

    if (!isOpen && !isClosing) return null;

    return createPortal(
        <Backdrop
            onClick={handleBackdropClick}
            $isClosing={isClosing}
            role="dialog"
            aria-modal="true"
            aria-labelledby={ariaLabelledby}
            aria-describedby={ariaDescribedby}
        >
            <ModalContainer
                ref={modalRef}
                tabIndex="-1"
                size={size}
                width={width}
                maxWidth={maxWidth}
                fullHeight={fullHeight}
                $isClosing={isClosing}
            >
                <ModalHeader>
                    <ModalTitle id={ariaLabelledby}>{title}</ModalTitle>
                    {showCloseButton && (
                        <CloseButton
                            onClick={handleClose}
                            aria-label="Close modal"
                        >
                            &times;
                        </CloseButton>
                    )}
                </ModalHeader>
                <ModalBody id={ariaDescribedby}>
                    {children}
                </ModalBody>
                {footerContent && <ModalFooter>{footerContent}</ModalFooter>}
            </ModalContainer>
        </Backdrop>,
        document.body
    );
};

AdvancedModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
    footerContent: PropTypes.node,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    width: PropTypes.string,
    maxWidth: PropTypes.string,
    fullHeight: PropTypes.bool,
    closeOnBackdropClick: PropTypes.bool,
    closeOnEscape: PropTypes.bool,
    showCloseButton: PropTypes.bool,
    ariaLabelledby: PropTypes.string,
    ariaDescribedby: PropTypes.string,
};

export default AdvancedModal;