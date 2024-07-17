"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchData } from "../redux/slices/dataSlice";
import Loader from "./Loader";

const DataTable: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { coinData, symbol } = useSelector((state: RootState) => state.data);

  const { data, status, error } = coinData;

  useEffect(() => {
    dispatch(fetchData(symbol));
  }, [dispatch, symbol]);

  return (
    <div className="border-gray-950 relative overflow-x-auto shadow-md sm:rounded-lg">
      {status === "loading" && <Loader />}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400u">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Symbol
              </th>

              <th scope="col" className="px-6 py-3">
                Timestamp
              </th>

              <th scope="col" className="p-4">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((entry, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                {index === 0 ? (
                  <td rowSpan={data?.length} className="px-6 py-3">
                    {entry.symbol}
                  </td>
                ) : null}

                <td className="px-6 py-3">
                  {new Date(entry.timestamp).toLocaleString()}
                </td>

                <td className="w-4 p-4">{entry.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DataTable;
