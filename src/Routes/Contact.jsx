import React, { useContext } from 'react';
import "../index.css"
import Form from '../Components/Form'
import {ContextGlobal} from '../Components/utils/global.context';


const Contact = () => {

  const { contextValue } = useContext(ContextGlobal);
  const { state } = contextValue;

  return (
    <div className={state.theme} id="contact">
      <h2>Do you want to know about me?</h2>
      <p>Send me your information to contact you</p>
      <Form/>
    </div>
  );
};

export default Contact;