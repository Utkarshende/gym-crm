import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";

import { GENDER, STATUS, PLAN } from "../utils/constants.js";
import {
  validateName,
  validatePhone,
  validateEmail,
} from "../utils/validator.js";

import {
  successAlert,
  errorAlert,
  warningAlert,
} from "../utils/alert";

function AddMember() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    gender: GENDER[0],
    age: "",
    address: "",
    fee: "",
    plan: PLAN[0],
    status: STATUS[0],
    weight: "",
    height: "",
    goal: "",
  });

  const update = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateName(form.name) || form.name.length < 3) {
      return warningAlert(
        "Invalid Name",
        "Name must contain at least 3 alphabets"
      );
    }

    if (!validatePhone(form.phone)) {
      return warningAlert(
        "Invalid Phone",
        "Phone number must be exactly 10 digits"
      );
    }

    if (form.email && !validateEmail(form.email)) {
      return warningAlert(
        "Invalid Email",
        "Please enter a valid email address"
      );
    }

    if (Number(form.fee) < 0) {
      return warningAlert(
        "Invalid Fee",
        "Fee cannot be negative"
      );
    }

    try {
      setLoading(true);

      await API.post("/members", form);

      successAlert(
        "Member Added Successfully",
        `${form.name} has been added`
      );

      navigate("/dashboard");

    } catch (error) {
      console.error(error);

      errorAlert(
        "Failed To Add Member",
        error.response?.data?.message ||
          "Server connection failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto pb-24">

      <Button
        onClick={() => navigate(-1)}
        className="mb-5 bg-gray-200 text-gray-700 hover:bg-gray-300"
      >
        ← Back
      </Button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Add New Member
        </h1>

        <p className="text-gray-500 mt-1">
          Fill all required details
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-xl border border-gray-100 p-5 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-5"
      >

        <Input
          label="Full Name"
          value={form.name}
          onChange={(e) =>
            update("name", e.target.value)
          }
        />

        <Input
          label="Phone"
          value={form.phone}
          onChange={(e) =>
            update(
              "phone",
              e.target.value
                .replace(/\D/g, "")
                .slice(0, 10)
            )
          }
        />

        <Input
          className="md:col-span-2"
          label="Email"
          value={form.email}
          onChange={(e) =>
            update("email", e.target.value)
          }
        />

        <Select
          label="Gender"
          value={form.gender}
          onChange={(e) =>
            update("gender", e.target.value)
          }
          options={GENDER}
        />

        <Input
          label="Age"
          type="number"
          value={form.age}
          onChange={(e) =>
            update("age", e.target.value)
          }
        />

        <Input
          className="md:col-span-2"
          label="Address"
          value={form.address}
          onChange={(e) =>
            update("address", e.target.value)
          }
        />

        <Input
          label="Monthly Fee"
          type="number"
          value={form.fee}
          onChange={(e) =>
            update("fee", e.target.value)
          }
        />

        <Select
          label="Plan"
          value={form.plan}
          onChange={(e) =>
            update("plan", e.target.value)
          }
          options={PLAN}
        />

        <Input
          label="Weight (kg)"
          type="number"
          value={form.weight}
          onChange={(e) =>
            update("weight", e.target.value)
          }
        />

        <Input
          label="Height (cm)"
          type="number"
          value={form.height}
          onChange={(e) =>
            update("height", e.target.value)
          }
        />

        <Input
          className="md:col-span-2"
          label="Fitness Goal"
          value={form.goal}
          onChange={(e) =>
            update("goal", e.target.value)
          }
        />

        <Select
          label="Status"
          value={form.status}
          onChange={(e) =>
            update("status", e.target.value)
          }
          options={STATUS}
        />

        <div className="md:col-span-2 pt-4">
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-4 text-lg"
          >
            {loading
              ? "Adding Member..."
              : "Add Member"}
          </Button>
        </div>

      </form>
    </div>
  );
}

export default AddMember;