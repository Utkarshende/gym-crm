import Button from "../ui/Button";

function DashboardHeader({ dark, setDark, onAdd }) {
  return (
   
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8">
      
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        Members Dashboard
      </h1>

      

    </div>
  );
}

export default DashboardHeader;