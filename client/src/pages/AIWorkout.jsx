import { useState } from "react";
import API from "../services/api";

function AIWorkout() {

  const [form, setForm] = useState({
    age: "",
    weight: "",
    height: "",
    gender: "Male",
    goal: "",
  });

  const [loading, setLoading] = useState(false);

  const [plan, setPlan] = useState("");

  const generatePlan = async () => {

    try {

      setLoading(true);

      const res = await API.post(
        "/ai/workout-plan",
        form
      );

      setPlan(res.data.plan);

    } catch (error) {

      alert("Failed to generate plan");

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        AI Workout Planner
      </h1>

      <div className="grid gap-4">

        <input
          placeholder="Age"
          className="border p-3 rounded"
          onChange={(e) =>
            setForm({
              ...form,
              age: e.target.value,
            })
          }
        />

        <input
          placeholder="Weight"
          className="border p-3 rounded"
          onChange={(e) =>
            setForm({
              ...form,
              weight: e.target.value,
            })
          }
        />

        <input
          placeholder="Height"
          className="border p-3 rounded"
          onChange={(e) =>
            setForm({
              ...form,
              height: e.target.value,
            })
          }
        />

        <input
          placeholder="Goal"
          className="border p-3 rounded"
          onChange={(e) =>
            setForm({
              ...form,
              goal: e.target.value,
            })
          }
        />

        <button
          onClick={generatePlan}
          className="bg-blue-600 text-white py-3 rounded"
        >
          {loading
            ? "Generating..."
            : "Generate AI Plan"}
        </button>
      </div>

      {plan && (
        <div className="mt-8 bg-white shadow p-5 rounded whitespace-pre-wrap">
          {plan}
        </div>
      )}
    </div>
  );
}

export default AIWorkout;