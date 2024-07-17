"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { setSymbol } from "../redux/slices/dataSlice";
import { useEffect } from "react";
import { symbolsList } from "@/utils/constants";

const SymbolSelector: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { symbol } = useSelector((state: RootState) => state.data);

  const data = symbolsList;

  useEffect(() => {
    dispatch(setSymbol(data?.[0]?.symbol));
  }, [data]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSymbol(event.target.value));
  };

  return (
    <div>
      <label htmlFor="symbol">Select Symbol: </label>
      <select id="symbol" value={symbol} onChange={handleChange}>
        {data?.map((entry, _) => (
          <option key={entry.id} value={entry.symbol}>
            {entry.name} - {entry.symbol}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SymbolSelector;
