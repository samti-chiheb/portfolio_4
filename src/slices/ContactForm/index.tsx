"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Heading from "@/components/Heading"; // Ton composant existant pour le style
import Bounded from "@/components/Bounded";

/**
 * Props for `ContactForm`.
 */
type ContactFormProps = SliceComponentProps<Content.ContactFormSlice>;

type FormData = {
  name: string;
  email: string;
  message: string;
};

const ContactForm = ({ slice }: ContactFormProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      setResponse(result.message);
    } catch (error) {
      setResponse("Une erreur est survenue.");
    }

    setLoading(false);
  };

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {slice.primary.heading && (
        <Heading size="lg" className="mb-6">
          {slice.primary.heading}
        </Heading>
      )}
      {slice.primary.heading && (
        <Heading as="h3" size="sm" className="mb-6">
          {slice.primary.description}
        </Heading>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="ml-6 mt-8 flex max-w-prose flex-col gap-2 space-y-4 md:ml-12 md:mt-16"
      >
        <div className="w-full">
          <div className="prose prose-lg prose-invert flex justify-between">
            <label className="block font-medium">Nom</label>
            <span
              className={`mr-6 block text-4xl font-medium ${errors.name && "animate-pulse text-red-400"}`}
            >
              *
            </span>
          </div>
          <input
            {...register("name", { required: true })}
            className="w-full rounded p-2 "
          />
        </div>

        <div className="w-full">
          <div className="prose prose-lg prose-invert flex justify-between">
            <label className="block font-medium">Email</label>
            <span
              className={`mr-6 block text-4xl font-medium ${errors.email && "animate-pulse text-red-400"}`}
            >
              *
            </span>
          </div>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full rounded border p-2"
          />
        </div>

        <div className="w-full">
          <div className="prose prose-lg prose-invert flex justify-between">
            <label className="block font-medium">Message</label>
            <span
              className={`mr-6 block text-4xl font-medium ${errors.message && "animate-pulse text-red-400"}`}
            >
              *
            </span>
          </div>
          <textarea
            {...register("message", { required: true, minLength: 50 })}
            className="w-full rounded border p-2"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`flex-end mt-2 w-1/2 cursor-pointer rounded bg-violet-700 p-2 font-bold text-white hover:bg-violet-600 ${loading && "bg-slate-600"}`}
        >
          {loading ? "Envoi..." : "Envoyer"}
        </button>

        {response && <p className="mt-4 text-green-600">{response}</p>}
      </form>
    </Bounded>
  );
};

export default ContactForm;
