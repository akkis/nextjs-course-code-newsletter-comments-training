import classes from "./newsletter-registration.module.css";
import { useRef, useState } from "react";

function NewsletterRegistration() {
  const [registerSucces, setRegisterSuccess] = useState(false);
  const emailInputRef = useRef();

  function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    const bodyReq = {
      email: enteredEmail,
    };

    fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(bodyReq),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setRegisterSuccess(true);
        }
      });

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      {!registerSucces && (
        <form onSubmit={registrationHandler}>
          <div className={classes.control}>
            <input
              type="email"
              id="email"
              placeholder="Your email"
              aria-label="Your email"
              ref={emailInputRef}
            />
            <button>Register</button>
          </div>
        </form>
      )}
      {registerSucces && (
        <p className="center">Thank you for your registration!</p>
      )}
    </section>
  );
}

export default NewsletterRegistration;
