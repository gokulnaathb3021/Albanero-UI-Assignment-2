"use client";

import { useState } from "react";
import AddForm from "./components/AddForm";
import EditForm from "./components/EditForm";
import styles from "./page.module.css";

type HomeProps = {
  company_name: string;
  email_address: string;
  contact_details: string;
  domains: string;
  managers: {
    [manager: string]: string[];
  };
  head_count: number;
  id: string;
};
const defaultCompanyValue: HomeProps = {
  company_name: "",
  email_address: "",
  contact_details: "",
  domains: "",
  managers: {},
  head_count: 0,
  id: "0",
};
export default function Home() {
  const [companies, setCompanies] = useState<HomeProps[]>([
    {
      company_name: "Albanero",
      email_address: "gokulnaathb@albanero.com",
      contact_details: "994033472",
      domains: "gaming",
      managers: { vivek: ["gokulnaath"] },
      head_count: 2,
      id: "1",
    },
    {
      company_name: "DCMS",
      email_address: "gokulnaathb@dcms.com",
      contact_details: "994033472",
      domains: "photography",
      managers: { neha: ["gokulnaath"] },
      head_count: 2,
      id: "2",
    },
  ]);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [companyToEdit, setCompanyToEdit] = useState<string>("");

  const addCompany = (company: HomeProps) => {
    setCompanies((prevCompanies) => {
      return [...prevCompanies, company];
    });
  };

  const closeAddForm = () => {
    setShowAddForm(false);
  };

  const updateCompanyById = (company: HomeProps) => {
    let id = company.id;
    let C = companies.find((c) => c.id === id);
    let idx = companies.indexOf(C!);
    let companies_deepCopy = [...companies];
    companies_deepCopy.splice(idx, 1, company);
    setCompanies(() => companies_deepCopy);
  };

  const closeEditForm = () => {
    setShowEditForm(false);
  };

  const deleteCompany = (id: string) => {
    let C = companies.find((c) => c.id === id);
    let idx = companies.indexOf(C!);
    let companies_deepCopy = [...companies];
    companies_deepCopy.splice(idx, 1);
    setCompanies(() => companies_deepCopy);
  };

  return (
    <div className={styles.landingPage}>
      <button
        className={styles.addButton}
        onClick={() => {
          setShowAddForm(true);
        }}
      >
        Click to add a company
      </button>
      {showAddForm && (
        <AddForm addCompany={addCompany} closeAddForm={closeAddForm} />
      )}
      {showEditForm && (
        <EditForm
          details={
            companies.find((company) => company.id === companyToEdit) ??
            defaultCompanyValue
          }
          updateCompanyById={updateCompanyById}
          closeEditForm={closeEditForm}
        />
      )}
      <table className={styles.styledTable}>
        <thead>
          <tr>
            <th>Name of company</th>
            <th>Email address</th>
            <th>Contact details</th>
            <th>Domain</th>
            <th>Head count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr>
              <td>{company.company_name}</td>
              <td>{company.email_address}</td>
              <td>{company.contact_details}</td>
              <td>{company.domains}</td>
              <td>{company.head_count}</td>
              <td className={styles.buttons}>
                <button
                  onClick={() => {
                    setCompanyToEdit(company.id);
                    setShowEditForm(true);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => deleteCompany(company.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
