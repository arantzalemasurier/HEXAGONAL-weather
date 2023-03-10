import React, { useRef } from 'react';
import { Formik } from 'formik';
import SearchInput from '../styles/searchInput';
import SearchContainer from '../styles/searchContainer';


type Props = {
  value: string;
  showResult: boolean;
  change: (event: React.ChangeEvent<HTMLInputElement>) => void;
  submit: (value: string) => void;
};

const SearchView: React.FC<Props> = ({ submit }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Formik
      initialValues={{
        searchInput: ''
      }}
      onSubmit={(values, { setSubmitting }) => {
        submit(values.searchInput);
        inputRef.current?.blur();
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleSubmit }: { 
        values: { searchInput: string };
        handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
        isSubmitting: boolean;
      }) => (
        <SearchContainer onSubmit={handleSubmit}>
          <SearchInput
            type="text"
            name="searchInput"
            value={values.searchInput}
            onChange={handleChange}
            placeholder="Ejemplo: Málaga, España"
            ref={inputRef}
          />
        </SearchContainer>
      )}
    </Formik>
  );
};

export default SearchView;
