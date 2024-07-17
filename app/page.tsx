"use client";

import DataTable from "@/components/DataTable";
import SymbolSelector from "@/components/SymbolSelector";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

const Home: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="flex flex-col items-center gap-20">
        <SymbolSelector />
        <DataTable />
      </div>
    </Provider>
  );
};

export default Home;
