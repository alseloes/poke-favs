import React from "react";
import { useState } from "react";
import "../index.css"
import Swal from 'sweetalert2';


const Form = () => {

  const[name,setName]= useState("");
  const[email, setEmail]= useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");


  const validName =(name) => {
    return name.length > 5;
    };


  const validEmail = (email) => {
      return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
    };

  function handleSubmit (e){
    e.preventDefault();


    const nameValido = validName(name)
    const emailValido = validEmail(email)



    if (nameValido && emailValido){
      setName("");
      setEmail("");
      Swal.fire({
        title: 'Thank you!',
        text:`Thank you ${name}, we will contact you as soon as possible via email.`,
        icon:'success',
        showConfirmButton: false,
        timer: 1800
      })
      setError(null);
      setSuccessMessage("");
    }
    else{

      Swal.fire({
        title: 'Error!',
        text:`Please verify your information.`,
        icon:'error',
        showConfirmButton: false,
        timer: 1800
      })

      setSuccessMessage("");

    }

  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-button-container">
          <button type="submit">Send</button>
        </div>
      </form>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
};

export default Form;