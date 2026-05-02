import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import AddMember from "./pages/AddMember";
import EditMember from "./pages/EditMember";
import ViewMode from "./pages/ViewMode";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-member" element={<AddMember />} />
        <Route path="/member/edit/:id" element={<EditMember />} />
        <Route path="/member/view/:id" element={<ViewMode />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;