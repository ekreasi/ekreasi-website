export class UserInternal {
    id: number;
    email: string;
	  password:string ;
	  constructor(values: Object = {}) {
      Object.assign(this, values);
    }
}

export class UserActivation {
    activationCode: string;
    userId: string;
    email: string;
    password: string;
    retypePassword: string;
    secretQuestions: string;
    secretAnswer: string;
    otpCode: string;
    captcha: string;
    tickTerms: string;
    type: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

export class ChangePassword {
    currentPassword: string;
    newPassword: string;
    retypePassword: string;
    captcha: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

export class UserForgot {
    email: string;
    secretQuestions: string;
    secretAnswer: string;
    otpCode: string;
    captcha: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

export class ContactForm {
    name: string;
    email: string;
    category: string;
    phone: string;
    subject: string;
    message: string;
    status: string;
    captcha: string;
    location: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
