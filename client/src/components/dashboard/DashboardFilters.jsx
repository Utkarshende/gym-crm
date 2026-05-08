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
    
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 items-end">
      
      <div className="xs:col-span-2 md:col-span-1">
        <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">Search</label>
        <Input 
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="col-span-1">
        <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">Status</label>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          options={["all", "active", "paused", "expired"]}
          className="w-full"
        />
      </div>

      <Button 
        onClick={onExport}
        className="bg-green-600 hover:bg-green-700 w-full h-[42px] flex justify-center items-center"
      >
        Export CSV
      </Button>

      <div className="flex items-center justify-center md:justify-end h-[42px] px-2">
        <span className="text-sm text-gray-500 mr-1 font-normal">Total:</span>
        <span className="font-bold text-lg">{total}</span>
      </div>

    </div>
  );
}

export default DashboardFilters;