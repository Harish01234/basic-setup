import { connectDB } from "@/utills/db";
import mongoose from "mongoose";

// define schema and model
const EmployeeSchema = new mongoose.Schema({
  name: String,
  dept: String,
});
const Employee =
  mongoose.models.Employee || mongoose.model("Employee", EmployeeSchema);

// ✅ GET: fetch all employees
export async function GET() {
  try {
    await connectDB();
    const employees = await Employee.find();
    return new Response(JSON.stringify(employees), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}

// ✅ POST: add a new employee
export async function POST(req) {
  try {
    await connectDB();
    const { name, dept } = await req.json();
    const employee = await Employee.create({ name, dept });
    return new Response(JSON.stringify(employee), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to add employee" }), {
      status: 500,
    });
  }
}

// ✅ DELETE: delete by id
export async function DELETE(req) {
  try {
    await connectDB();
    const { id } = await req.json();
    await Employee.findByIdAndDelete(id);
    return new Response(JSON.stringify({ message: "Deleted successfully" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete employee" }), {
      status: 500,
    });
  }
}

// ✅ PUT: update by id
export async function PUT(req) {
  try {
    await connectDB();
    const { id, name, dept } = await req.json();
    await Employee.findByIdAndUpdate(id, { name, dept });
    return new Response(JSON.stringify({ message: "Updated successfully" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to update employee" }), {
      status: 500,
    });
  }
}