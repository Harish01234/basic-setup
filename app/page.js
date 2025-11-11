"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [dept, setDept] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch data
  const fetchData = async () => {
    const res = await fetch("/api/data");
    const data = await res.json();
    setEmployees(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add employee
  const addEmployee = async (e) => {
    e.preventDefault();
    if (!name || !dept) return alert("Please fill all fields");
    setLoading(true);
    await fetch("/api/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, dept }),
    });
    setName("");
    setDept("");
    await fetchData();
    setLoading(false);
  };

  // Delete employee
  const deleteEmployee = async (id) => {
    setLoading(true);
    await fetch("/api/data", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await fetchData();
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 text-teal-400 drop-shadow-md">
        Employee Manager
      </h1>

      {/* Form */}
      <form
        onSubmit={addEmployee}
        className="flex flex-col md:flex-row gap-4 bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-xl mb-8"
      >
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white focus:outline-none focus:border-teal-500"
        />
        <input
          type="text"
          placeholder="Enter Department"
          value={dept}
          onChange={(e) => setDept(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white focus:outline-none focus:border-teal-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-2 rounded-lg transition-all disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add"}
        </button>
      </form>

      {/* Table */}
      <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-2xl shadow-xl overflow-x-auto">
        {employees.length === 0 ? (
          <p className="text-center text-gray-400">No data found.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="p-3">#</th>
                <th className="p-3">Name</th>
                <th className="p-3">Department</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, index) => (
                <tr
                  key={emp._id}
                  className="hover:bg-gray-700 transition-colors border-b border-gray-800"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{emp.name}</td>
                  <td className="p-3">{emp.dept}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => deleteEmployee(emp._id)}
                      className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-lg text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
