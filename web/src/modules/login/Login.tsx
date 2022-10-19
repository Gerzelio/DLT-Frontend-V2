import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useFormik} from 'formik';
import {useTranslation} from 'react-i18next';
import {loginUser} from '@store/reducers/auth';
import {Checkbox, Button} from '@components';
import {faEnvelope, faEye, faEyeSlash, faLock, faUser} from '@fortawesome/free-solid-svg-icons';
import {setWindowClass} from '@app/utils/helpers';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { Center, Box, Text, Heading, VStack, FormControl, Input, Image } from 'native-base';

import * as Yup from 'yup';

import {Form, InputGroup} from 'react-bootstrap';
import * as AuthService from '../../services/auth';

const Login = () => {
  const [isAuthLoading, setAuthLoading] = useState(false);
  const dispatch = useDispatch();
  const [passwordType, setPasswordType] = useState("password");

  const navigate = useNavigate();
  const [t] = useTranslation();

  const login = async (email: string, password: string) => {
    try {
      setAuthLoading(true);
      const data = await AuthService.loginByAuth(email, password);
      toast.success('Autenticação efectuada com sucesso!');
      setAuthLoading(false);
      dispatch(loginUser(data));
      navigate('/');
    } catch ( error ) {
      setAuthLoading(false);
      toast.error( 'Erro de autenticação!');
    }
  };

  const {handleChange, values, handleSubmit, touched, errors} = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Obrigatório'),
      password: Yup.string()
        .required('Obrigatório')
    }),
    onSubmit: (values) => {
      login(values.email, values.password);
    }
  });

  const togglePassword =()=>{

    if(passwordType==="password")
    {
     setPasswordType("")
     return;
    }
    setPasswordType("password")
  };

  setWindowClass('hold-transition login-page');

  return (
    <div className="login-box">
      <div className="card card-outline card-primary"  style={{ }}>
        <div style={{alignItems  : 'center', width:'50%' }}>
          <img  style={{  width: "100%", marginLeft: "50%", marginTop:"10%"}}  src={'img/dreams.png'} />
        </div>
        <div className="card-header text-center">
          <p className="login-box-msg">
            {/* {t('login.label.signIn')} */}
            Dreams Layering Tool
            </p>
        </div>
        <div className="card-body">
          <p className="h1 text-center">
            <b>Autenticação</b>
          </p>
          <p className="login-box-msg">
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="email"
                  name="email"
                  placeholder="Insira o Username"
                  onChange={handleChange}
                  value={values.email}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && !!errors.email}
                />
                {touched.email && errors.email ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faUser} />
                    </InputGroup.Text>
                  </InputGroup.Append>
                )}
              </InputGroup>
            </div>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="password"
                  name="password"
                  type={passwordType}
                  placeholder="Insira a Password"
                  onChange={handleChange}
                  value={values.password}
                  isValid={touched.password && !errors.password}
                  isInvalid={touched.password && !!errors.password}
                />
                {touched.password && errors.password ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup.Append>
                    <InputGroup.Text>{ 
                        passwordType==="password"? 
                          <FontAwesomeIcon icon={faEyeSlash} onClick={togglePassword} />
                        :
                          <FontAwesomeIcon icon={faEye} onClick={togglePassword} />
                      }
                    </InputGroup.Text>
                  </InputGroup.Append>
                )}
              </InputGroup>
            </div>

            <div className="row">
              <div className="col-12">
                <Button
                  block
                  type="submit"
                  isLoading={isAuthLoading}
                  style={{background:"#0C4A6E"}}
                >
                  {/* @ts-ignore */}
                  {/* {t('login.button.signIn.label')} */}
                  Autenticar
                </Button>
              </div>
            </div>
          </form>
          <p className="mb-1">
            <Link to="/forgot-password">Esqueceu a password?</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
