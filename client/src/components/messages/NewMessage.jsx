import React, { useState } from 'react';
import { sendMessage } from '../../services/api';
import '../forms/ContactForm'
import ContactForm from '../forms/ContactForm';

const NewMessage = () => {
  return (
    <div>
      <ContactForm />
    </div>
  )
}



export default NewMessage;
