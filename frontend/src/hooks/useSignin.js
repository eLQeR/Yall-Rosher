import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  useSigninMutation,
  setTokens,
  useLazyGetUserQuery,
  setUser,
} from '../state/user';

export const useSignin = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signin, signinRes] = useSigninMutation();
  const [getUser, getUserRes] = useLazyGetUserQuery();

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    signin(formData)
      .unwrap()
      .then((fullfilled) => {
        dispatch(
          setTokens({
            refreshToken: fullfilled.refreshToken,
            accessToken: fullfilled.accessToken,
          }),
        );
        getUser()
          .unwrap()
          .then((fullfilled) => dispatch(setUser(fullfilled)));
        navigate('/');
      })
      .catch((rejected) => console.log(rejected));
  };

  return {
    loading: signinRes.isLoading || getUserRes.isLoading,
    error: signinRes?.error?.data?.detail || getUserRes?.error?.data,
    handleFormSubmit,
    handleInputChange,
  };
};
