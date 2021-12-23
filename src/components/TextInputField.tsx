import React from 'react';

import {Control, Controller, useFormState} from 'react-hook-form';

import {Field, TextInput} from '../design-system';

interface TextInputFieldProps {
  control: Control;
  label: string;
  name: string;
}

export const TextInputField: React.FunctionComponent<TextInputFieldProps> = ({
  control,
  label,
  name,
}) => {
  const form = useFormState({control});

  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({field: {onChange, onBlur, value}}) => (
        <Field.Root>
          <Field.Label>{label}</Field.Label>
          <TextInput onBlur={onBlur} onChangeText={onChange} value={value} />
          <Field.Message>{form.errors[name]}</Field.Message>
        </Field.Root>
      )}
      name="firstName"
    />
  );
};
