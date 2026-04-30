import Input from "../ui/Input";
import Button from "../ui/Button";

function MemberForm({
  member,
  setMember,
  onSubmit,
  title,
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-2xl font-bold mb-5">
        {title}
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <Input
          placeholder="Full Name"
          value={member.name}
          onChange={(e) =>
            setMember({
              ...member,
              name: e.target.value,
            })
          }
        />

        <Input
          placeholder="Phone"
          value={member.phone}
          onChange={(e) =>
            setMember({
              ...member,
              phone: e.target.value
                .replace(/\D/g, "")
                .slice(0, 10),
            })
          }
        />

        <Input
          type="number"
          placeholder="Fee"
          value={member.fee}
          onChange={(e) =>
            setMember({
              ...member,
              fee: Math.max(
                0,
                Number(
                  e.target.value
                )
              ),
            })
          }
        />

        <select
          className="border p-2 rounded-lg"
          value={member.plan}
          onChange={(e) =>
            setMember({
              ...member,
              plan: e.target.value,
            })
          }
        >
          <option value="monthly">
            Monthly
          </option>

          <option value="quarterly">
            Quarterly
          </option>
        </select>

      </div>

      <Button
        onClick={onSubmit}
        className="mt-5"
      >
        Save Member
      </Button>

    </div>
  );
}

export default MemberForm;