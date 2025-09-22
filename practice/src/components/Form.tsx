import React, { useState } from "react";


export default function GenericForm()
{
  const [form, setForm] = useState({name: "", email: ""});
  const [error, setError] = useState({});

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [e.target.name]: e.target.value})
  };

  const validate = () => {
    const newErrors  = {};
    if (!form.name.trim()) newErrors.name = "Please enter a name.";
    else if (!form.email.includes("@")) newErrors.email = "Invalid email.";
    return newErrors;
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    console.log("valid form", form);
    setError({});
  };

  return(
  <form onSubmit={handleSubmit}>
      <input
        name='name'
        value={form.name}
        onChange={handleChange}
        placeholder='Name'
      />
      {error.name && <p style={{color: 'red'}}>{error.name}</p>}
      <input
        name='email'
        value={form.email}
        onChange={handleChange}
        placeholder='email'
      />
      {error.email && <p style={{color: 'red'}}>{error.email}</p>}
      <button type='submit'>
        Submit
      </button>
  </form>
  )
}
