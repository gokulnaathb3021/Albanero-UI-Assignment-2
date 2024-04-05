export type HomeProps = {
  [key: string]: any;
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

export type managersEmployees = {
  [key: string]: string[];
};
