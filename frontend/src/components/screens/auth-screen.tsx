import { useState } from "react"

import Button from "../ui/button/button"
import Field from "../ui/field/field"

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true)

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-[url('/backgrounds/auth.jpg')] bg-cover bg-center py-10">
      {/* Форма */}
      <div className="min-w-[600px] flex flex-col justify-center items-center rounded-3xl gap-8 px-20 py-10 bg-white">
        {/* Заголовок */}
        <div className="text-3xl">
          {isLogin ? "Авторизация" : "Регистрация"}
        </div>

        {/* Поля и остальное */}
        <div className="w-full flex flex-col gap-3">
          {/* Поля */}
          <div className="w-full flex flex-col gap-6">
            {!isLogin && (
              <>
                <Field label="Введите имя" placeholder="Иван" />
                <Field label="Введите фамилию" placeholder="Иванов" />
                <Field
                  label="Введите отчество (если есть)"
                  placeholder="Иванович"
                />
              </>
            )}

            <Field
              type="email"
              label="Введите email"
              placeholder="example@mail.ru"
            />

            <Field
              type="password"
              label="Введите пароль"
              placeholder="********"
            />

            {!isLogin && (
              <Field
                type="password"
                label="Повторно введите пароль"
                placeholder="********"
              />
            )}
          </div>

          {/* Чекбокс "Запомнить меня" и ссылка на форму регистрации */}
          <div className="w-full flex flex-row justify-between">
            {isLogin && (
              <div className="flex flex-row gap-3 justify-start items-center">
                <input className="h-6 w-6" type="checkbox" />

                <div className="whitespace-nowrap">Запомнить меня</div>
              </div>
            )}

            <div
              onClick={() => setIsLogin((prev) => !prev)}
              className="w-full flex flex-row justify-end cursor-pointer text-blue"
            >
              {isLogin ? "Регистрация" : "Авторизация"}
            </div>
          </div>

          {/* Кнопка "войти" */}
          <div className="w-full flex flex-col ">
            <Button className="text-xl">
              {isLogin ? "Войти" : "Зарегистрироваться"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthScreen
