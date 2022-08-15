function showInputError (selectors, formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectors.spanErrorActive);
}

function hideInputError (selectors, formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.classList.remove(selectors.spanErrorActive);
  errorElement.textContent = '';
}

function isValid(selectors, formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(selectors, formElement, inputElement, inputElement.validationMessage);
  }
  else {
    hideInputError(selectors, formElement, inputElement);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return (!inputElement.validity.valid);
  });
};

function toggleButtonState(selectors, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(selectors.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }
  else {
    buttonElement.classList.remove(selectors.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

function setEventListener(selectors, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
  toggleButtonState(selectors, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      isValid(selectors, formElement, inputElement);
      toggleButtonState(selectors, inputList, buttonElement);
    });
  });
}

function enableValidation(selectors) {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector));
  formList.forEach((formElement) => {
    setEventListener(selectors, formElement);
  })
}

