// src/components/members/MemberForm.jsx

import { useState, useEffect } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

function MemberForm({
  initialData = {},
  onSubmit,
  loading = false,
  submitText = "Save Member",
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
    height: "",
    weight: "",
    goalWeight: "",
    fee: "",
    plan: "monthly",
    category: "gym",
    status: "active",
    startDate: "",
    endDate: "",
    emergencyName: "",
    emergencyPhone: "",
    paymentAmount: "",
    paymentDate: "",
    ...initialData,
  });

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      ...initialData,
    }));
  }, [initialData]);

  const updateField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onlyLetters = (value) =>
    value.replace(/[^a-zA-Z ]/g, "");

  const onlyNumbers = (value, max = 10) =>
    value.replace(/\D/g, "").slice(0, max);

  const validate = () => {
    if (!/^[A-Za-z ]{3,}$/.test(form.name)) {
      alert("Name must contain only letters and minimum 3 characters");
      return false;
    }

    if (!/^\d{10}$/.test(form.phone)) {
      alert("Phone must be exactly 10 digits");
      return false;
    }

    if (
      form.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      alert("Invalid email address");
      return false;
    }

    if (Number(form.fee) < 0) {
      alert("Fee cannot be negative");
      return false;
    }

    if (
      form.emergencyName &&
      !/^[A-Za-z ]+$/.test(form.emergencyName)
    ) {
      alert("Emergency contact name only letters allowed");
      return false;
    }

    if (
      form.emergencyPhone &&
      !/^\d{10}$/.test(form.emergencyPhone)
    ) {
      alert("Emergency phone must be 10 digits");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* PERSONAL */}
      <div className="bg-white dark:bg-gray-900 shadow rounded-2xl p-5">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          Personal Information
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            value={form.name}
            onChange={(e) =>
              updateField(
                "name",
                onlyLetters(e.target.value)
              )
            }
          />

          <Input
            label="Email"
            value={form.email}
            onChange={(e) =>
              updateField("email", e.target.value)
            }
          />

          <Input
            label="Phone Number"
            value={form.phone}
            onChange={(e) =>
              updateField(
                "phone",
                onlyNumbers(e.target.value)
              )
            }
          />

          <Input
            type="date"
            label="Date of Birth"
            value={form.dob}
            onChange={(e) =>
              updateField("dob", e.target.value)
            }
          />

          <select
            className="border rounded-xl px-3 py-2 dark:bg-gray-800 dark:text-white"
            value={form.gender}
            onChange={(e) =>
              updateField("gender", e.target.value)
            }
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <Input
            label="Address"
            value={form.address}
            onChange={(e) =>
              updateField("address", e.target.value)
            }
          />
        </div>
      </div>

      {/* BODY */}
      <div className="bg-white dark:bg-gray-900 shadow rounded-2xl p-5">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          Fitness Information
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <Input
            type="number"
            label="Height"
            value={form.height}
            onChange={(e) =>
              updateField(
                "height",
                Math.max(0, e.target.value)
              )
            }
          />

          <Input
            type="number"
            label="Weight"
            value={form.weight}
            onChange={(e) =>
              updateField(
                "weight",
                Math.max(0, e.target.value)
              )
            }
          />

          <Input
            type="number"
            label="Goal Weight"
            value={form.goalWeight}
            onChange={(e) =>
              updateField(
                "goalWeight",
                Math.max(0, e.target.value)
              )
            }
          />
        </div>
      </div>

      {/* MEMBERSHIP */}
      <div className="bg-white dark:bg-gray-900 shadow rounded-2xl p-5">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          Membership
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <select
            className="border rounded-xl px-3 py-2 dark:bg-gray-800 dark:text-white"
            value={form.plan}
            onChange={(e) =>
              updateField("plan", e.target.value)
            }
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">
              Quarterly
            </option>
          </select>

          <select
            className="border rounded-xl px-3 py-2 dark:bg-gray-800 dark:text-white"
            value={form.category}
            onChange={(e) =>
              updateField("category", e.target.value)
            }
          >
            <option value="gym">Gym</option>
            <option value="gym+cardio">
              Gym + Cardio
            </option>
          </select>

          <Input
            type="number"
            label="Fees"
            value={form.fee}
            onChange={(e) =>
              updateField(
                "fee",
                Math.max(0, e.target.value)
              )
            }
          />

          <select
            className="border rounded-xl px-3 py-2 dark:bg-gray-800 dark:text-white"
            value={form.status}
            onChange={(e) =>
              updateField("status", e.target.value)
            }
          >
            <option value="active">Active</option>
            <option value="expired">
              Not Active
            </option>
            <option value="paused">
              On Break
            </option>
          </select>

          <Input
            type="date"
            label="Joined Date"
            value={form.startDate?.slice(0, 10)}
            onChange={(e) =>
              updateField(
                "startDate",
                e.target.value
              )
            }
          />

          <Input
            type="date"
            label="Expiry Date"
            value={form.endDate?.slice(0, 10)}
            onChange={(e) =>
              updateField(
                "endDate",
                e.target.value
              )
            }
          />
        </div>
      </div>

      {/* PAYMENT */}
      <div className="bg-white dark:bg-gray-900 shadow rounded-2xl p-5">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          Payment History
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <Input
            type="number"
            label="Payment Amount"
            value={form.paymentAmount}
            onChange={(e) =>
              updateField(
                "paymentAmount",
                Math.max(0, e.target.value)
              )
            }
          />

          <Input
            type="date"
            label="Payment Date"
            value={form.paymentDate}
            onChange={(e) =>
              updateField(
                "paymentDate",
                e.target.value
              )
            }
          />
        </div>
      </div>

      {/* EMERGENCY */}
      <div className="bg-white dark:bg-gray-900 shadow rounded-2xl p-5">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          Emergency Contact
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Emergency Name"
            value={form.emergencyName}
            onChange={(e) =>
              updateField(
                "emergencyName",
                onlyLetters(e.target.value)
              )
            }
          />

          <Input
            label="Emergency Phone"
            value={form.emergencyPhone}
            onChange={(e) =>
              updateField(
                "emergencyPhone",
                onlyNumbers(e.target.value)
              )
            }
          />
        </div>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : submitText}
      </Button>
    </form>
  );
}

export default MemberForm;