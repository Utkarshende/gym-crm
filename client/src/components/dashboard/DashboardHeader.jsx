import Button from "../ui/Button";

function DashboardHeader({ dark, setDark, onAdd }) {
  return (
    <div className="flex flex-wrap gap-3 justify-between items-center mb-6">
      
      <h1 className="text-3xl font-bold">Members Dashboard</h1>

      <div className="flex gap-3 flex-wrap">
        <Button 
          onClick={() => setDark(!dark)} 
          className="bg-slate-700 hover:bg-slate-600"
        >
          {dark ? "Light Mode" : "Dark Mode"}
        </Button>

        <Button onClick={onAdd}>
          + Add Member
        </Button>
      </div>

    </div>
  );
}

export default DashboardHeader;