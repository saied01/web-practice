import React, { useState } from "react";


export default function GenericForm() {
  const [form, setForm] = useState<Record<string, string> | null>({ name: "", email: "" });
  const [error, setError] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  };

  const validate = () => {
    const newErrors: Record<string, string> | null = {};
    if (!form.name.trim()) newErrors.name = "Please enter a name.";
    else if (!form.email.includes("@")) newErrors.email = "Invalid email.";
    return newErrors;
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      setForm({ name: "", email: "" });
      return;
    }

    console.log("valid form", form);


    try {
      const response = await fetch("http://localhost:5000/api/items/create_item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("fetch error");

      const data = await response.json();
      console.error("Data: ", data);
    } catch (err) {
      console.error(err);
    } finally {
      setError({});
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name='name'
        value={form.name}
        onChange={handleChange}
        placeholder='Name'
      />
      {error.name && <p style={{ color: 'red' }}>{error.name}</p>}
      <input
        name='email'
        value={form.email}
        onChange={handleChange}
        placeholder='email'
      />
      {error.email && <p style={{ color: 'red' }}>{error.email}</p>}
      <button type='submit'>
        Submit
      </button>
    </form>
  )
}
