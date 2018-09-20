
export default {
  caption: {
    menu: 'Menu',
    login: 'Login',
    join: 'Registration',
    passwordRecovery: 'Password recovery',
    userConfirmationStepper: 'There are few steps left to start using Coopel'
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
    passwordRecoveryLink: 'Forgot password?',
    newAccount: {
      question: 'New to Coopel?',
      link: 'Create account.'
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
      expired: 'More than 24 hours have passed or link has already been used, please request password recovery again.'
    },
    revokeSessions: {
      success: 'You will have to login again on all devices, including this one.'
    },
    emailConfirm: {
      success: 'Email successfully confirmed.',
      expired: 'More than 24 hours have passed or link has already been used, please login and request email confirmation again.'
    }
  },
  button: {
    next: 'Next',
    previous: 'Back',
    send: 'Send'
  },
  confirmationStepper: {
    clarify: {
      title: 'Clarify account data'
    },
    confirm: {
      title: 'Confirm email',
      body1: 'We sent next steps to your email after registration.',
      body2: 'If nothing received or link expired, please check account email and send one more time.'
    },
    objects: {
      title: 'Find objects'
    }
  },
  settings: {
    common: {
      title: 'Account'
    },
    security: {
      title: 'Security',
      changePassword: 'Change password',
      revokeSessions: 'Revoke all sessions'
    },
    objects: {
      title: 'Objects'
    }
  }
}
