import classes from "./newsletter-registration.module.css";
import { useRef, useState, useContext } from "react";
import NotificationContext from "../../store/notification-context";

function NewsletterRegistration() {
  const [registerSucces, setRegisterSuccess] = useState(false);
  const emailInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    if (
      !enteredEmail ||
      enteredEmail.trim() === "" ||
      !enteredEmail.includes("@")
    ) {
      notificationCtx.showNotification({
        title: "Missing email",
        message: "Enter an valid address",
        status: "error",
      });
      return;
    }

    const bodyReq = {
      email: enteredEmail,
    };

    notificationCtx.showNotification({
      title: "Singing up",
      message: "registering for newsletter",
      status: "pending",
    });

    fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(bodyReq),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        response.json().then((data) => {
          throw new Error(data.message || "Something went wrong");
        });
      })
      .then((data) => {
        if (data.success) {
          notificationCtx.showNotification({
            title: "Success!",
            message: "Thank you for registering.",
            status: "success",
          });
          setRegisterSuccess(true);
        }
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error",
          message:
            error.message ||
            "Something went wrong. Please try again in a minute.",
          status: "error",
        });
      });
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
