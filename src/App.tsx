import { useState } from "react";
import Modal from "./Components/Modal";
import "./styles.css";

const employeeObj = [
  {
    name: "Raj",
    role: "Developer",
    age: 25,
    dob: "1997-05-19",
    id: 1,
    img: "https://images.unsplash.com/photo-1733690683193-087f7bd60bdc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGdva3V8ZW58MHx8MHx8fDA%3D",
  },
];

interface Employee {
  name: string;
  role: string;
  age: number;
  id: number;
  img: string;
  dob: string;
}

interface FieldsObj {
  Label: string;
  key: keyof Employee;
  type: string;
}

const fieldsObj: FieldsObj[] = [
  { Label: "Enter Name", key: "name", type: "text" },
  { Label: "Age", key: "age", type: "number" },
  { Label: "Role", key: "role", type: "text" },
  { Label: "Image URL", key: "img", type: "text" },
  { Label: "Enter DoB", key: "dob", type: "date" },
];

export default function App() {
  const [employeeList, setEmployeeList] = useState<Employee[]>(employeeObj);
  const [currEmployee, setCurrEmployee] = useState<Employee | null>(null);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [addEmployee, setAddEmployee] = useState<Employee>({
    name: "",
    role: "",
    age: 0,
    dob: "",
    id: new Date().getTime(), // Unique ID
    img: "",
  });

  const handleRemove = (id: number) => {
    let filterList = employeeList?.filter((item) => item.id != id);
    setEmployeeList(filterList);
  };

  return (
    <div className="container">
      <div className="employee-list">
        <h5>
          Employee List{" "}
          <button onClick={() => setIsShowModal(true)}> Add+ </button>
        </h5>
        <div>
          {employeeList.map((employee) => (
            <p
              key={employee.id}
              onClick={() => setCurrEmployee(employee)}
              className="employee-name"
            >
              {employee.name}{" "}
              <span onClick={() => handleRemove(employee.id)}> ❌ </span>
            </p>
          ))}
        </div>
      </div>

      {currEmployee && (
        <div className="employee-details">
          <img src={currEmployee.img} alt="Employee" className="employee-img" />
          <ul>
            <li>
              <span>Name:</span> {currEmployee.name}
            </li>
            <li>
              <span>Age:</span> {currEmployee.age}
            </li>
            <li>
              <span>Role:</span> {currEmployee.role}
            </li>
            <li>
              <span>Employee ID:</span> {currEmployee.id}
            </li>
          </ul>
        </div>
      )}

      {isShowModal && (
        <Modal>
          <div className="fields_container">
            <h5> Add Employee </h5>
            {fieldsObj.map((fields, index) => (
              <label key={index}>
                {fields.Label}
                <input
                  value={addEmployee[fields.key] as string | number}
                  onChange={(e) => {
                    const value =
                      fields.key === "age" ? +e.target.value : e.target.value;
                    setAddEmployee((prev) => ({
                      ...prev,
                      [fields.key]: value,
                    }));
                  }}
                  type={fields.type}
                />
              </label>
            ))}
            <div>
              <button
                onClick={() => {
                  const newEmployee = {
                    ...addEmployee,
                    id: new Date().getTime(),
                  };
                  setEmployeeList((prev) => [...prev, newEmployee]);
                  setAddEmployee({
                    name: "",
                    role: "",
                    age: 0,
                    dob: "",
                    id: new Date().getTime(),
                    img: "",
                  });
                  setIsShowModal(false);
                }}
              >
                Submit
              </button>
              <button onClick={() => setIsShowModal(false)}>Cancel</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
