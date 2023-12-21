import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{6,})/;

const {t} = useTranslation();

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email(`${t("Invalid Email")}`)
    .required(`${t("Email Required")}`),
  password: Yup.string()
    .required(`${t("Password Required")}`)
    .min(8, `${t("Password too short")}`)
    .matches(
      passwordRegExp,
      `${t("Password must be a combination of letters and numbers")}`
    ),
});

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email(`${t("Invalid Email")}`)
    .required(`${t("Email Required")}`),
});
