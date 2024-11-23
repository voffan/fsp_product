import { useState } from "react"
import { useUserStore } from "../../store/user.store"
import { SubmitHandler, useForm, useWatch } from "react-hook-form"
import { IRegistartionDataWithSecondName } from "../../interfaces/auth"

import Button from "../ui/button/button"
import Field from "../ui/field/field"
import Loader from "../ui/loader/loader"

const AuthScreen = () => {
  const [secondPassword, setSecondPassword] = useState<string>("")

  const { login, register, isLoading, isError, error, isLogin, setIsLogin } =
    useUserStore()

  const {
    register: formRegister,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IRegistartionDataWithSecondName>({ mode: "onChange" })

  const password = useWatch({ control, name: "password" })

  const onSubmit: SubmitHandler<IRegistartionDataWithSecondName> = async (
    data
  ) => {
    if (isLogin) {
      await login(data)
    } else {
      if (data.second_name)
        data.first_name = data.first_name + " " + data.second_name
      await register(data)
    }
    reset()
  }

  if (isLoading) return <Loader />

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-[url('/backgrounds/auth.jpg')] bg-cover bg-center py-10">
      {/* Форма */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-w-[600px] flex flex-col justify-center items-center rounded-3xl gap-8 px-20 py-10 bg-white"
      >
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
                <Field
                  {...formRegister("first_name", { required: "Введите имя" })}
                  label="Введите имя"
                  placeholder="Иван"
                  error={errors.first_name?.message}
                />
                <Field
                  {...formRegister("last_name", {
                    required: "Введите фамилию",
                  })}
                  label="Введите фамилию"
                  placeholder="Иванов"
                  error={errors.last_name?.message}
                />
                <Field
                  {...formRegister("second_name", {})}
                  label="Введите отчество (если есть)"
                  placeholder="Иванович"
                />
                <Field
                  {...formRegister("email", {
                    required: "Введите email",
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      message: "Введите корректный email",
                    },
                  })}
                  type="email"
                  label="Введите email"
                  placeholder="example@mail.ru"
                  error={errors.email?.message}
                />
              </>
            )}

            <Field
              {...formRegister("username", {
                required: "Введите логин",
                minLength: {
                  value: 3,
                  message: "Минимальная длина логина 3 символа",
                },
              })}
              label="Введите логин"
              placeholder="ivan"
              error={errors.username?.message}
            />

            <Field
              {...formRegister("password", {
                required: "Введите пароль",
                minLength: {
                  value: 6,
                  message: "Минимальная длина пароля 6 символов",
                },
              })}
              type="password"
              label="Введите пароль"
              placeholder="********"
              error={
                errors.password?.message ||
                (!isLogin && password !== secondPassword
                  ? "Пароли не совпадают"
                  : "")
              }
            />

            {!isLogin && (
              <Field
                value={secondPassword}
                onChange={(e) => {
                  setSecondPassword(e.target.value)
                }}
                type="password"
                label="Повторно введите пароль"
                placeholder="********"
                error={password !== secondPassword ? "Пароли не совпадают" : ""}
              />
            )}
            {isError && <div className="text-red-500">{error}</div>}
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
              onClick={() => {
                setIsLogin(!isLogin)
                reset()
              }}
              className="w-full flex flex-row justify-end cursor-pointer text-blue"
            >
              {isLogin ? "Регистрация" : "Авторизация"}
            </div>
          </div>

          {/* Кнопка "войти" */}
          <div className="w-full flex flex-col ">
            <Button>
              <div className="text-xl">
                {isLogin ? "Войти" : "Зарегистрироваться"}
              </div>
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AuthScreen
