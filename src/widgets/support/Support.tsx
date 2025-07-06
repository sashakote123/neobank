import "./styles.css";

import emailImage from "@images/support/email.svg";
import sendBtnImage from "@images/support/send.svg";
import clsx from "clsx";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IForm {
  mail: string;
}

const Support = () => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {},
  });

  const submit: SubmitHandler<IForm> = () => {
    setIsShow(true);
    setTimeout(() => setIsShow(false), 2000);
  };

  const isMail = (data: string) => {
    return data.includes("@mail.com");
  };

  const buttonClass = clsx("form__input", {
    "form__input--error": errors.mail,
  });

  return (
    <section className="support">
      <h3 className="suppor__title">Support</h3>
      <h4 className="support__subtitle">Subscribe Newsletter & get</h4>
      <h4 className="support__subsubtitle">Bank News</h4>
      <form className="support__form" onSubmit={handleSubmit(submit)}>
        <div className={buttonClass}>
          <img src={emailImage} alt="inputImg" />
          <input
            placeholder="Your email"
            type="mail"
            {...register("mail", { required: true, validate: isMail })}
          />
          <div className="form__error">
            {errors.mail?.type === "required" ? (
              <div>Это поле обязательно</div>
            ) : errors.mail?.type === "validate" ? (
              <div>Введите корректный адрес почты</div>
            ) : null}
          </div>
        </div>
        <button className="form__button">
          <img src={sendBtnImage} alt="inputImg" />
          <div className="button__text">Subscribe</div>
        </button>

        <div
          className="form__alert"
          style={{
            transform: isShow ? "translateX(270px)" : "",
            transition: isShow ? "transform 0.2s ease-in" : "",
          }}
        >
          Вы подписались на рассылку!
        </div>
      </form>
    </section>
  );
};
export default Support;
