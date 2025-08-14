import clsx from 'clsx';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useState } from 'react';

import inputImg from './assets/inputImg.svg';
import sendBtnImage from './assets/sendBtnImage.svg';
import './styles.css';

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

  const submit: SubmitHandler<IForm> = (data) => {
    fetch('http://localhost:8080/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(data),
    })
      .then(() => {
        setIsShow(true);
        setTimeout(() => setIsShow(false), 2000);
      })
      .catch((err) => console.log(err));
  };

  const isMail = (data: string) => {
    return data.includes('@mail.com');
  };

  const buttonClass = clsx('form__input', {
    'form__input--error': errors.mail,
  });

  return (
    <section className="support">
      <h3 data-testid="title" className="suppor__title">
        Support
      </h3>
      <h4 data-testid="subtitle" className="support__subtitle">
        Subscribe Newsletter & get
      </h4>
      <h4 data-testid="subsubtitle" className="support__subsubtitle">
        Bank News
      </h4>
      <form data-testid="form" className="support__form" onSubmit={handleSubmit(submit)}>
        <div className={buttonClass}>
          <img data-testid="inputimg" src={inputImg} alt="inputImg" />
          <input
            data-testid="input"
            placeholder="Your email"
            type="mail"
            {...register('mail', { required: true, validate: isMail })}
          />
          <div data-testid="error" className="form__error">
            {errors.mail?.type === 'required' ? (
              <div data-testid="requireError">Это поле обязательно</div>
            ) : errors.mail?.type === 'validate' ? (
              <div data-testid="validateError">Введите корректный адрес почты</div>
            ) : null}
          </div>
        </div>
        <button data-testid="button" className="form__button">
          <img data-testid="sendBtnImage" src={sendBtnImage} alt="sendBtnImage" />
          <div className="button__text">Subscribe</div>
        </button>

        <div
          data-testid="alert"
          className="form__alert"
          style={{
            transform: isShow ? 'translateX(270px)' : '',
            transition: isShow ? 'transform 0.2s ease-in' : '',
          }}
        >
          Вы подписались на рассылку!
        </div>
      </form>
    </section>
  );
};
export default Support;
