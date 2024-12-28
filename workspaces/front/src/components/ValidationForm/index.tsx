import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCardSchema, ICreditCard } from "../../types/commons";
import styles from './styles.module.css';
import { useState } from "react";
import { CreditCard } from "../CreditCard";

export function ValidationForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ICreditCard>({
    resolver: zodResolver(CreditCardSchema),
  });

  const [isValid, setIsValid] = useState<boolean | null>(null);
  const cardNumber = watch("number", "");

  async function onSubmit(formData: ICreditCard) {
    const endpoint = import.meta.env.VITE_API_ENDPOINT;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify({
        'card-number': formData.number,
      })
    });

    const data = await response.json();
    setIsValid(data['is-valid'] ?? null);
  }

  const handleCardNumberInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsValid(null);
    let value = event.target.value.replace(/\D/g, '');
    const maxDigits = 19;
    value = value.slice(0, maxDigits);
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    event.target.value = value;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <CreditCard cardNumber={cardNumber} />

      <h1>Credit Card Validation</h1>

      <label className={styles["form__box"]}>
        <span>Card number</span>
        <input
          type='text'
          placeholder='0000 0000 0000 0000'
          {...register('number', { required: true })}
          onInput={handleCardNumberInput}
        />
        {errors.number && <span className={styles['form__error']}>{errors.number.message}</span>}
      </label>

      <button type="submit" className={styles['form__button']}>
        Submit
      </button>

      {isValid === true && (
        <p className={styles.valid}>Card Number is valid</p>
      )}

      {isValid === false && (
        <p className={styles.invalid}>Card Number is invalid</p>
      )}
    </form>
  );
}