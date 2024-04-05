"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./AddForm.module.css";
import toast from "react-hot-toast";
import { validations } from "@/utils/validation";
import { v4 } from "uuid";
import { HomeProps, managersEmployees } from "@/utils/types_used";
import { MdDelete } from "react-icons/md";

type EditFormProps = {
  details: HomeProps;
  updateCompanyById: Function;
  closeEditForm: Function;
};

const EditForm: React.FC<EditFormProps> = ({
  details,
  updateCompanyById,
  closeEditForm,
}) => {
  const [employees, setEmployees] = useState<managersEmployees>({});
  const managerRef = useRef<HTMLInputElement>(null);
  const employeeRef = useRef<HTMLInputElement>(null);

  function saveChanges(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (Object.keys(employees).length === 0) {
      toast.error(
        "There should atleast be one manager and atleast one employee under every manager!",
        { duration: 4000 }
      );
      return;
    }
    const formData = new FormData(e.currentTarget);
    let company: HomeProps = {
      company_name: "",
      email_address: "",
      contact_details: "",
      domains: "",
      managers: {},
      head_count: 0,
      id: "",
    };

    let validationCount = validations(formData);

    if (validationCount === 3) {
      formData.forEach((value, key) => {
        if (key === "manager") {
          company["managers"] = employees;
        } else if (key !== "employee") {
          company[key] = value;
        }
      });

      let head_count = 0;
      head_count = Object.keys(employees).length;
      Object.keys(employees).forEach((k) => {
        head_count += employees[k].length;
      });
      company["head_count"] = head_count;
      company.id = details.id;
      updateCompanyById(company);
      closeEditForm();
    }
  }

  function addEmployee() {
    let employeeName = employeeRef.current!.value;
    if (employeeName.length === 0) {
      toast.error("Employee name is empty!", { duration: 4000 });
      return;
    }
    let managerName = managerRef.current!.value;
    if (managerName.length === 0) {
      toast.error(`Enter the name of ${employeeName}'s manager!`, {
        duration: 4000,
      });
      return;
    }

    let employeesUnderManager = employees[managerName]
      ? [...employees[managerName]]
      : [];
    employeesUnderManager.push(employeeName);

    let employeesUnderManagers = {
      ...employees,
      [managerName]: employeesUnderManager,
    };
    setEmployees(() => {
      return employeesUnderManagers;
    });
    (document.getElementById("employee") as HTMLInputElement).value = "";
    toast.success(`${employeeName} added under ${managerName}`, {
      duration: 4000,
    });
  }

  const removeEmployee = (empName: string, mgrName: string) => {
    let employeesUnderMgr = [...employees[mgrName]];
    let idx = employeesUnderMgr.indexOf(empName);
    employeesUnderMgr.splice(idx, 1);
    let managersAndEmployees = { ...employees };
    if (employeesUnderMgr.length === 0) {
      delete managersAndEmployees[mgrName];
      setEmployees(() => managersAndEmployees);
    } else {
      managersAndEmployees[mgrName] = employeesUnderMgr;
      setEmployees(() => managersAndEmployees);
    }
  };

  useEffect(() => {
    setEmployees(() => details.managers);
  }, []);
  return (
    <div className={styles.addForm}>
      <form onSubmit={saveChanges}>
        <h2>MAKE YOUR EDITS BELOW</h2>
        <div className={styles.pair}>
          <div className={styles.labelAndInput}>
            <label htmlFor="company_name">Name of company</label>
            <input
              id="company_name"
              name="company_name"
              type="text"
              defaultValue={details.company_name}
            ></input>
          </div>
          <div className={styles.labelAndInput}>
            <label htmlFor="email_address">Email address</label>
            <input
              id="email_address"
              name="email_address"
              type="text"
              defaultValue={details.email_address}
            ></input>
          </div>
        </div>
        <div className={styles.pair}>
          <div className={styles.labelAndInput}>
            <label htmlFor="contact_details">Contact details</label>
            <input
              id="contact_details"
              placeholder="phone number"
              name="contact_details"
              type="text"
              defaultValue={details.contact_details}
            ></input>
          </div>
          <div className={styles.labelAndInput}>
            <label htmlFor="domains">Domain</label>
            <select id="domains" name="domains" defaultValue={details.domains}>
              <option value="Gaming">Gaming</option>
              <option value="Automobile">Automobile</option>
              <option value="Photography">Photography</option>
            </select>
          </div>
        </div>
        <div className={styles.pair}>
          <div className={styles.labelAndInput}>
            <label htmlFor="manager">Manager</label>
            <input
              id="manager"
              name="manager"
              type="text"
              ref={managerRef}
            ></input>
          </div>
          <div className={styles.labelAndInput}>
            <label htmlFor="employee">Employee</label>
            <input
              id="employee"
              name="employee"
              type="text"
              ref={employeeRef}
            ></input>
            <button
              onClick={addEmployee}
              type="button"
              className={styles.addFormButtons}
            >
              Add employee
            </button>
          </div>
        </div>
        <div className={styles.managersAndEmployees}>
          {Object.entries(employees).map(([key, value]) => (
            <div key={key} className={styles.managerAndEmployees}>
              <p className={styles.managerName}>{`Employees under ${key}`}:</p>
              {value.map((val) => (
                <li key={v4()} className={styles.listElement}>
                  {val}
                  <button
                    type="button"
                    onClick={() => removeEmployee(val, key)}
                  >
                    <MdDelete />
                  </button>
                </li>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.saveOrDiscard}>
          <button type="submit" className={styles.addFormButtons}>
            Save changes
          </button>
          <button type="button" onClick={() => closeEditForm()}>
            Discard
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
