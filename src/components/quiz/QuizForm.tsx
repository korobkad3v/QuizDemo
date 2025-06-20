// QuizForm.tsx
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState } from "react";
import { Button } from "../common/Button";
import QuizCompletion from "./QuizCompletion";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export default function QuizForm() {
  const initialFormState: FormData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  };
  const [form, setForm] = useState<FormData>(initialFormState);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  const validate = () => {
    const newErrors: Record<string, string> = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s\-().]{10,20}$/;

    if (!form.firstName.trim()) newErrors.firstName = "Enter your name";
    if (!form.lastName.trim()) newErrors.lastName = "Enter your last name";

    if (!emailRegex.test(form.email.trim())) {
      newErrors.email = "Enter a valid email address";
    }

    if (!phoneRegex.test(form.phone.trim())) {
      newErrors.phone = "Enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Данные отправлены:", form);
      setSubmitted(true);
      setForm(initialFormState);
    }
  };
  if (submitted) {
    return <QuizCompletion />;
  }
  return (
    <main className="flex flex-col items-center justify-center px-5 max-w-xl mx-auto size-full">
      <h1 className="text-[22px]  font-semibold text-primary-foreground text-center mb-5">
        Fill in your details
      </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">Name</label>
          <input
            id="firstName"
            name="firstName"
            autoComplete="name"
            value={form.firstName}
            onChange={handleChange}
            className="flex h-9 w-full rounded-lg  bg-primary px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5 transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50"
          />
          {errors.firstName && <p className="text-red">{errors.firstName}</p>}
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            autoComplete="name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="flex h-9 w-full rounded-lg  bg-primary px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5 transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50"
          />
          {errors.lastName && <p className="text-red">{errors.lastName}</p>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="flex h-9 w-full rounded-lg  bg-primary px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5 transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50"
          />
          {errors.email && <p className="text-red">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone">Phone</label>
          <PhoneInput
            inputProps={{
              name: "phone",
              required: true,
              autoFocus: true,
              id: "phone",
              autoComplete: "tel",
            }}
            country={"ua"}
            preferredCountries={["ua", "ru", "us"]}
            value={form.phone}
            onChange={(phone) => setForm({ ...form, phone })}
            containerClass="!text-base"
            placeholder="Enter your phone number bg-primary"
            inputStyle={{ backgroundColor: "rgba(244, 243, 246, 1)" }}
            inputClass="flex h-9 w-full rounded-lg  px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5 transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50"
          />
          {errors.phone && <p className="text-red">{errors.phone}</p>}
        </div>
        <Button className="uppercase w-full mt-10" variant={"accent"}>
          Submit
        </Button>
      </form>
    </main>
  );
}
