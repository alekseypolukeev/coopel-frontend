
export default {
  caption: {
    menu: 'Menu',
    login: 'Login to Coople',
    join: 'Registration',
    passwordRecovery: 'Password recovery',
    userConfirmationStepper: 'There are few steps to start using Coopel'
  },
  dialog: {
    success: 'Done',
    info: 'Information',
    warning: 'Warning',
    error: 'Error'
  },
  notify: {
    positive: {
      done: 'Successfully done',
      updated: 'Successfully updated'
    },
    negative: {
      custom: 'Unexpected error: {error}',
      emailDuplicate: 'User with same email already exist. Try to login or recover password',
      userNotFound: 'User not found',
      phoneDuplicate: 'User with same phone already exist',
      loginBadCredentials: 'Wrong username or password'
    }
  },
  label: {
    home: 'Home',
    messages: 'Messages',
    settings: 'Settings',
    logOut: 'Logout',
    input: {
      email: 'Email',
      phone: 'Phone',
      firstName: 'First name',
      lastName: 'Last name',
      middleName: 'Middle name',
      password: 'Password',
      passwordConfirm: 'Repeat password',
      error: {
        required: 'Mandatory field',
        maxLength: 'Max length: {length}',
        minLength: 'Min length: {length}',
        email: 'Wrong format',
        phone: 'E.q 7 xxx xxx xx xx',
        password: 'Must be alphanumeric',
        passwordConfirm: 'Must be same as password'
      }
    },
    passwordRecoveryLink: 'Forget password?',
    newAccount: {
      question: 'Have no account?',
      link: 'Register.'
    },
    haveAccount: {
      question: 'Already have account?',
      link: 'Login.'
    },
    joined: {
      success: 'User successfully created.'
    },
    passwordRecovered: {
      success: 'We sent you email with next steps.'
    },
    passwordSet: {
      success: 'Password successfully changed, all sessions revoked.',
      expired: 'Прошло более 24 часов или ссылка уже была использована, пожалуйста запросите восстановление пароля еще раз.'
    },
    revokeSessions: {
      success: 'You will have to login again on all devices, including this one.'
    },
    emailConfirm: {
      success: 'Email successfully confirmed.',
      expired: 'Прошло более 24 часов или ссылка уже была использована, пожалуйста войдите в личный кабинет и запросите подтверждение email еще раз.'
    }
  },
  button: {
    next: 'Next',
    previous: 'Back',
    send: 'Send'
  }
}
