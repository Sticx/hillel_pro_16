function FormValidate(form) {
    const _errorWrapperClass = 'error';
    const _errorItemClass = 'error__item';
    const _parentItemClass = 'form-control';
    const _elements = form.elements;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        this.checkFormElement();
        // this.checkForm();
    })

    this.checkFormElement = function () {
        for (let i = 0; i < _elements.length; i++) {
            const element = _elements[i];
            const passwordMessage = element.dataset.password
            if (passwordMessage) {
                this.validPassword(passwordMessage);
            }
        }
    }
    this.validPassword = function (message) {
        const allPasswordElement = form.querySelectorAll("input[type='password']");
        const valueArr = Array.from(allPasswordElement).map(element => element.value);

        if (valueArr[0] !== valueArr[1]) {
            allPasswordElement.forEach(item => this.errorTemplate(item, message))
        }
    }

    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    const mail = form.querySelector("input[name='email']");
    function onInput (message) {

        if (mail.value.length > 0 && isEmailValid(mail.value)) {
            mail.style.borderColor = 'green';
        } else {
            mail.style.borderColor = 'red';
           // const emailMessage = mail.dataset.email;
           // mail.forEach(item =>this.errorTemplate(emailMessage)); ERROR
            // mail.forEach(item=>this.errorTemplate(item,message)); (не рабочая, ERROR)
        }
    }

    mail.addEventListener('input', onInput);

    function isEmailValid(value) {
        return EMAIL_REGEXP.test(value);
    }

    this.errorTemplate = function (element, message) {
        const parent = element.closest(`.${_parentItemClass}`);
        if (!parent.classList.contains(_errorWrapperClass)) {
            parent.classList.add(_errorWrapperClass);
            parent.insertAdjacentHTML('beforeend', `<small class="${_errorItemClass}">${message}</small>`)
        }
    }
}

const form = new FormValidate(document.querySelector('#form'));
