function FormValidate(form) {
    const _errorWrapperClass = 'error';
    const _errorItemClass = 'error__item';
    const _parentItemClass = 'form-control';
    const _elements = form.elements;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        this.checkFormElement();
    })
    
    this.clearElementError = function (element) {
        const parent = element.closest(`.${_parentItemClass}`)
        if (parent !== null && parent.classList.contains(_errorWrapperClass)=== true){
            parent.classList.remove(_errorWrapperClass);
            parent.querySelector(`.${_errorItemClass}`).remove()
        }
    }

    this.checkFormElement = function () {
        for (let i = 0; i < _elements.length; i++) {
            const element = _elements[i];
            this.clearElementError(element);
            const passwordMessage = element.dataset.password;
            const emailMessage = element.dataset.email;
            const lengthMessage = element.dataset.min_message;
            const reqMessage = element.dataset.req;
            if (reqMessage){
                this.validReq(reqMessage,element);
            }
            if (passwordMessage) {
                this.validPassword(passwordMessage);
            }
            if (emailMessage){
                this.validEmail(emailMessage);
            }
            if (lengthMessage){
                this.validLength(lengthMessage);
            }

        }
    }
    this.validReq = function (element) {
        const allInputReq = form.querySelectorAll("input");
        const allInputProp = Array.from(allInputReq).map(element => element.dataset.req);
        const currentInputLength = Array.from(allInputReq).map(element => element.value);

        console.log(allInputReq)
        console.log(allInputProp)
        console.log(currentInputLength)

        if (currentInputLength===null||currentInputLength===''){
            // allInputReq.forEach(element => this.errorTemplate(message, element));
            this.errorTemplate(allInputReq,element)
        }

    }
    this.validPassword = function (message) {
        const allPasswordElement = form.querySelectorAll("input[type='password']");
        const valueArr = Array.from(allPasswordElement).map(element => element.value);

        if (valueArr[0] !== valueArr[1]) {
            allPasswordElement.forEach(item => this.errorTemplate(item, message));
        }
    }

    this.validLength = function (message) {
        const allInputElement = form.querySelectorAll("input");
        const allInputLength = Array.from(allInputElement).map(element => element.dataset.min_length)
        const currentLength = Array.from(allInputElement).map(element => element.value.length);

        if (currentLength<allInputLength){
            allInputElement.forEach(item =>this.errorTemplate(item,message))
        }
    }

    this.validEmail = function (message){
        const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        const mail = form.querySelector("input[name='email']");

        if (!EMAIL_REGEXP.test(mail.value)){
            this.errorTemplate(mail,message);
        }

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
