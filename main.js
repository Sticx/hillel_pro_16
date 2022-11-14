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
            const emailMessage = element.dataset.email
            if (passwordMessage) {
                this.validPassword(passwordMessage);
            }
            if (emailMessage){
                this.validEmail(emailMessage);
            }
        }
        // for (let j = 0; j<_elements.length;j++){
        //     const elementsMail = _elements[j];
        //     const mailMessage = elementsMail.dataset.email;
        //     if (mailMessage){
        //         this.onIput(mailMessage);
        //     }
        // }
    }
    this.validPassword = function (message) {
        const allPasswordElement = form.querySelectorAll("input[type='password']");
        const valueArr = Array.from(allPasswordElement).map(element => element.value);

        if (valueArr[0] !== valueArr[1]) {
            allPasswordElement.forEach(item => this.errorTemplate(item, message))
        }
    }

    this.validEmail = function (message){
        const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        const mail = form.querySelector("input[name='email']");

        // console.log(mail.value);
        if (!EMAIL_REGEXP.test(mail.value)){
            mail.style.borderColor = 'red';
           mail.forEach(item => this.errorTemplate(item,message));
        }

    }
    // this.onInput = function (message) {
    //     const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    //     const mail = form.querySelector("input[name='email']");
    //     if (EMAIL_REGEXP.test(value)) {
    //         mail.style.borderColor = 'green';
    //     } else {
    //         mail.style.borderColor = 'red';
    //        // const emailMessage = mail.dataset.email;
    //        // mail.forEach(item =>this.errorTemplate(emailMessage)); ERROR
    //         mail.forEach(item=>this.errorTemplate(item,message));
    //     }
    // }


    // const email = form.querySelector("input[name='email']");
    // const emailError = email.dataset.email;
    //
    // email.addEventListener('input', function (event) {
    //     // Каждый раз, когда пользователь что-то вводит,
    //     // мы проверяем, являются ли поля формы валидными
    //
    //     if (email.validity.valid) {
    //         // Если на момент валидации какое-то сообщение об ошибке уже отображается,
    //         // если поле валидно, удаляем сообщение
    //         emailError.textContent = ''; // Сбросить содержимое сообщения
    //         emailError.className = 'error'; // Сбросить визуальное состояние сообщения
    //     } else {
    //         // Если поле не валидно, показываем правильную ошибку
    //        this.errorTemplate();
    //     }
    // });
    //
    // form.addEventListener('input', function (event) {
    //     // Если поле email валдно, позволяем форме отправляться
    //
    //     if(!email.validity.valid) {
    //         // Если поле email не валидно, отображаем соответствующее сообщение об ошибке
    //         this.errorTemplate();
    //         // Затем предотвращаем стандартное событие отправки формы
    //         event.preventDefault();
    //     }
    // });
    //
    // // function showError() {
    // //     if(email.validity.valueMissing) {
    // //         // Если поле пустое,
    // //         // отображаем следующее сообщение об ошибке
    // //         emailError.textContent = 'You need to enter an e-mail address.';
    // //     } else if(email.validity.typeMismatch) {
    // //         // Если поле содержит не email-адрес,
    // //         // отображаем следующее сообщение об ошибке
    // //         emailError.textContent = 'Entered value needs to be an e-mail address.';
    // //     } else if(email.validity.tooShort) {
    // //         // Если содержимое слишком короткое,
    // //         // отображаем следующее сообщение об ошибке
    // //         emailError.textContent = `Email should be at least ${ email.minLength } characters; you entered ${ email.value.length }.`;
    // //     }
    // //
    // //     // Задаём соответствующую стилизацию
    // //     emailError.className = 'error active';
    // // }

    this.errorTemplate = function (element, message) {
        const parent = element.closest(`.${_parentItemClass}`);
        if (!parent.classList.contains(_errorWrapperClass)) {
            parent.classList.add(_errorWrapperClass);
            parent.insertAdjacentHTML('beforeend', `<small class="${_errorItemClass}">${message}</small>`)
        }
    }
}

const form = new FormValidate(document.querySelector('#form'));
