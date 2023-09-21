import { useState, useRef } from 'react';
import classes from './AuthForm.module.css';
const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
   const [isLoading,setIsLoading]=useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

     setIsLoading(true);
     let url;


    if (isLogin) {
      // Handle login logic here

      url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDCn6Aksa3Ivlf_0FfXgHQb5cilhsxb0ZE'
    } else {
      url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDCn6Aksa3Ivlf_0FfXgHQb5cilhsxb0ZE'
    }
    fetch(url , {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          // Account created successfully, handle accordingly
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication error';
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage)
          });
        }
      }).then((data)=>{
        console.log(data);
      }).catch(err=>{
        alert(err.Message);
      })
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
        
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}
          </button>}
          {isLoading && <p>Sending Request.....</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Login with existing account' : 'Switch to Login'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;

// https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDCn6Aksa3Ivlf_0FfXgHQb5cilhsxb0ZE