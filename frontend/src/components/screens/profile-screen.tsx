import { SubmitHandler, useForm } from "react-hook-form"
import { useUserStore } from "../../store/user.store"
import { IUserChange } from "../../interfaces/user"
import { useMutation } from "@tanstack/react-query"
import { UserService } from "../../services/user/user.service"
import { removeEmptyFields } from "../utils/remove-empty-fields"

import Button from "../ui/button/button"
import Field from "../ui/field/field"
import Loader from "../ui/loader/loader"

const ProfileScreen = () => {
  const { isLoading, setUser } = useUserStore()
  const user = useUserStore((state) => state.user)

  const {
    register: formRegister,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
  } = useForm<IUserChange>({
    mode: "onChange",
    defaultValues: {
      first_name: user?.first_name.split(" ")[0],
      last_name: user?.last_name,
      email: user?.email,
      second_name: user?.first_name.split(" ")[1],
    },
  })

  const { mutate, isPending } = useMutation({
    mutationKey: ["change profile"],
    mutationFn: UserService.changeProfile,
    onSuccess: (res) => {
      setUser(res)

      setValue("first_name", res.first_name.split(" ")[0])
      setValue("second_name", res.first_name.split(" ")[1] || "")
      setValue("last_name", res.last_name)
      setValue("email", res.email)
    },
  })

  // const subscribe = useWatch({ control, name: "subscribe" })

  const onSubmit: SubmitHandler<IUserChange> = async (data) => {
    if (data.second_name)
      data.first_name = data.first_name + " " + data.second_name
    if (isDirty) {
      const cleanedData = removeEmptyFields(data)
      mutate(cleanedData)
    }
  }

  if (isPending || isLoading)
    return (
      <div className="w-full h-[calc(100vh-64px-220px)] flex justify-center items-center">
        <Loader />
      </div>
    )

  if (user)
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 shadow-md border-darkgray border-[1px] rounded-3xl p-8"
      >
        {/* Заголовок */}
        <div className="text-2xl mx-auto">Мой профиль</div>

        {/* Изменение данных и кнопка с чекбоксом */}
        <div className="flex flex-col gap-8">
          {/* Изменение данных и аватарки */}
          <div className="flex flex-row gap-10 p-10 shadow-md border-darkgray border-[1px] rounded-3xl">
            {/* Изменеиен данных */}
            <div className="w-full flex flex-col gap-5">
              <div className="text-xl">Данные профиля</div>

              <div className="flex flex-row gap-10">
                {/* Надписи к инпутам */}
                <div className="flex flex-col gap-4">
                  <div className="h-[54px] flex flex-row justify-start items-center">
                    Имя
                  </div>
                  <div className="h-[54px] flex flex-row justify-start items-center">
                    Фамилия
                  </div>
                  <div className="h-[54px] flex flex-row justify-start items-center">
                    Отчество
                  </div>
                  <div className="h-[54px] flex flex-row justify-start items-center">
                    Логин
                  </div>
                  <div className="h-[54px] flex flex-row justify-start items-center">
                    Email
                  </div>
                </div>
                {/* Инпуты */}
                <div className="flex flex-col gap-4 w-full">
                  <Field
                    {...formRegister("first_name", {
                      minLength: {
                        value: 2,
                        message: "Минимальная длина имени 2 символа",
                      },
                    })}
                    error={errors.first_name?.message}
                    defaultValue={user.first_name.split(" ")[0]}
                    placeholder={user.first_name.split(" ")[0]}
                  />
                  <Field
                    {...formRegister("last_name", {
                      minLength: {
                        value: 2,
                        message: "Минимальная фамилии имени 2 символа",
                      },
                    })}
                    error={errors.last_name?.message}
                    defaultValue={user.last_name}
                    placeholder={user.last_name}
                  />
                  <Field
                    {...formRegister("second_name", {
                      minLength: {
                        value: 2,
                        message: "Минимальная длина отчества 2 символа",
                      },
                    })}
                    error={errors.second_name?.message}
                    defaultValue={user.first_name.split(" ")[1] || "Отчество"}
                    placeholder={user.first_name.split(" ")[1] || "Отчество"}
                  />
                  <Field
                    disabled
                    value={user.username}
                    onChange={() => {}}
                    placeholder="Логин"
                  />
                  <Field
                    {...formRegister("email", {
                      pattern: {
                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                        message: "Введите корректный email",
                      },
                    })}
                    error={errors.email?.message}
                    defaultValue={user.email}
                    placeholder={user.email}
                  />
                </div>
              </div>
            </div>

            {/* Изменение аватарки */}
            {/* <div className="flex flex-col gap-5">
              <div className="text-xl whitespace-nowrap">Фото профиля</div>

              <div className="flex flex-col gap-6 items-center">
                <div className="rounded-full overflow-hidden h-32 w-32 bg-blue"></div>

                <div className="border-[1px] rounded-lg py-2 px-5 cursor-pointer">
                  Изменить
                </div>
              </div>
            </div> */}
          </div>

          {/* Чекбокс подписки на рассылку */}
          {/* <div className="flex flex-row justify-center items-center">
            <Checkbox
              checked={subscribe}
              onClick={() => {
                setValue("subscribe", !subscribe)
              }}
              size="6"
              labelSize="lg"
              direction="row"
              label="Подписаться на рассылку"
            />
          </div> */}

          {/* Кнопка сохранения */}
          <Button
            disabled={!isDirty}
            type="submit"
            className="w-min max-w-[300px] mx-auto h-auto py-3 px-20"
          >
            Сохранить
          </Button>
        </div>
      </form>
    )
}

export default ProfileScreen
