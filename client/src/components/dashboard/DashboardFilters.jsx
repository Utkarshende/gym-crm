import Input from "../ui/Input";
import Button from "../ui/Button";
import Select from "../ui/Select";

function DashboardFilters({
  search,
  setSearch,
  status,
  setStatus,
  onExport,
  total,
}) {
  return (
    <div className="grid md:grid-cols-4 gap-4 mb-6 items-end">

      <Input 
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        options={["all", "active", "paused", "expired"]}
      />

      <Button 
        onClick={onExport}
        className="bg-green-600 hover:bg-green-700"
      >
        Export CSV
      </Button>

      <div className="font-semibold flex items-center h-full pb-2">
        Total: {total}
      </div>

    </div>
  );
}

export default DashboardFilters;