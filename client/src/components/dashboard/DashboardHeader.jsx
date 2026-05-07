import Button from "../ui/Button";

function DashboardHeader({ dark, setDark, onAdd }) {
  return (
   
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8">
      
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        Members Dashboard
      </h1>

      <div className="flex gap-2 w-full sm:w-auto">
        <Button 
          onClick={onAdd}
          className="flex-1 sm:flex-none text-sm py-2 px-4 shadow-sm"
        >
          + <span className="hidden xs:inline">Add Member</span>
          <span className="xs:hidden">Add</span>
        </Button>
      </div>

    </div>
  );
}

export default DashboardHeader;