import React from 'react';

import {Control, Controller, useFormState} from 'react-hook-form';

import {Field, TextInput} from '../design-system';
import type {TextInputProps} from '../design-system';

interface TextInputFieldProps extends TextInputProps {
  control: Control;
  label: string;
  name: string;
}

export const TextInputField: React.FunctionComponent<TextInputFieldProps> = ({
  control,
  label,
  name,
  ...rest
}) => {
  const form = useFormState({control});

  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, onBlur, value}}) => (
        <Field.Root
          appearance={form.errors[name] == null ? undefined : 'danger'}
        >
          <Field.Label>{label}</Field.Label>
          <TextInput
            {...rest}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
          <Field.Message>{form.errors[name]?.message ?? ''}</Field.Message>
        </Field.Root>
      )}
    />
  );
};
