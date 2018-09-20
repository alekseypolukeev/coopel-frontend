
export default {
  caption: {
    menu: 'Меню',
    login: 'Вход в Coople',
    join: 'Регистрация',
    passwordRecovery: 'Восстановление пароля',
    userConfirmationStepper: 'Осталось несколько шагов чтобы начать использовать Coopel'
  },
  dialog: {
    success: 'Готово',
    info: 'Внимание',
    warning: 'Внимание',
    error: 'Ошибка'
  },
  notify: {
    positive: {
      done: 'Успешно выполнено',
      updated: 'Успешно обновлено'
    },
    negative: {
      custom: 'Непредвиденная ошибка: {error}',
      emailDuplicate: 'Пользователь с указанным email уже существует. Попробуйте войти или восстановить доступ',
      userNotFound: 'Пользователь не найден',
      phoneDuplicate: 'Пользователь с указанным телефоном уже существует',
      loginBadCredentials: 'Неверный логин или пароль'
    }
  },
  label: {
    home: 'Главная',
    messages: 'Сообщения',
    settings: 'Настройки',
    logOut: 'Выйти',
    input: {
      email: 'Email',
      phone: 'Телефон',
      firstName: 'Имя',
      lastName: 'Фамилия',
      middleName: 'Отчество',
      password: 'Пароль',
      passwordConfirm: 'Повторите пароль',
      error: {
        required: 'Обязательное поле',
        maxLength: 'Максимальная длина: {length}',
        minLength: 'Минимальная длина: {length}',
        email: 'Неверный формат',
        phone: 'Пример: 7 xxx xxx xx xx',
        password: 'Должен состоять из цифры и букв',
        passwordConfirm: 'Должен совпадать с паролем'
      }
    },
    passwordRecoveryLink: 'Забыли пароль?',
    newAccount: {
      question: 'Еще не имеете аккаунта?',
      link: 'Зарегистрироваться.'
    },
    haveAccount: {
      question: 'Уже есть аккаунт?',
      link: 'Войти.'
    },
    joined: {
      success: 'Пользователь успешно создан.'
    },
    passwordRecovered: {
      success: 'Мы выслали Вам электронное письмо с дальнейшими инструкциями.'
    },
    passwordSet: {
      success: 'Пароль успешно изменен, все сессии завершены.',
      expired: 'Прошло более 24 часов или ссылка уже была использована, пожалуйста запросите восстановление пароля еще раз.'
    },
    revokeSessions: {
      success: 'На всех устройствах (включая это) придется войти по-новой.'
    },
    emailConfirm: {
      success: 'Email успешно подтвержден.',
      expired: 'Прошло более 24 часов или ссылка уже была использована, пожалуйста войдите в личный кабинет и запросите подтверждение email еще раз.'
    }
  },
  error: {
    custom: 'Непредвиденная ошибка: {error}',
    emailDuplicate: 'Пользователь с указанным email уже существует. Попробуйте войти или восстановить доступ',
    userNotFound: 'Пользователь не найден',
    phoneDuplicate: 'Пользователь с указанным телефоном уже существует',
    loginBadCredentials: 'Неверный логин или пароль'
  },
  button: {
    next: 'Далее',
    previous: 'Назад',
    send: 'Отправить'
  },
  confirmationStepper: {
    clarify: {
      title: 'Уточнить данные'
    },
    confirm: {
      title: 'Подтвердить email',
      body1: 'При регистрации на Ваш email было оправлено письмо с инструкциями, пожалуйста следуйте им.',
      body2: 'Если ничего не пришло или срок действия ссылки истек, проверьте правильность указанного email адреса и отправьте еще раз.'
    },
    objects: {
      title: 'Выбрать объекты'
    }
  },
  settings: {
    common: {
      title: 'Общее'
    },
    security: {
      title: 'Безопасность',
      changePassword: 'Изменить пароль',
      revokeSessions: 'Завершить все сессии'
    },
    objects: {
      title: 'Объекты'
    }
  }
}
