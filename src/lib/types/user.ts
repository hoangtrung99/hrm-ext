export type Auth = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  user: UserType;
};

export interface UserType {
  id: number;
  user_name: string;
  email: string;
  email_verified_at: string;
  employee_id: number;
  company_id: number;
  is_first_time_login: number;
  setting: Setting;
  role: string;
  all_permissions: string[];
  employee: Employee;
  company: Company;
}

export interface Setting {
  id: number;
  format_date: string;
  time_zone: string;
  company_id: number;
  locale: string;
}

export interface Employee {
  id: number;
  card_number: string;
  employee_code: string;
  official_employee_date: string;
  date_start_work: string;
  position_id: number;
  department_id: number;
  branch_id: number;
  personal_information_id: number;
  status: number;
  company_id: number;
  personal_information: PersonalInformation;
  position: Position;
}

export interface PersonalInformation {
  id: number;
  first_name: string;
  last_name: string;
  job_id: number;
  nickname: string;
  birthday: string;
  marital_status: string;
  sex: number;
  email: string;
  phone: string;
  education_level_id: number;
  note: string;
  country_id: number;
  ethnic: string;
  updated_at: string;
  thumbnail_url: string;
  full_name: string;
  country: Country;
  job: Job;
}

export interface Country {
  id: number;
  name: string;
}

export interface Job {
  id: number;
  name: string;
  company_id: number;
}

export interface Position {
  id: number;
  name: string;
  company_id: number;
}

export interface Company {
  id: number;
  name: string;
  phone_number: string;
  tax_code: string;
  address: string;
  status: number;
  start_time: string;
  end_time: string;
  register_date: string;
  representative: string;
  type_of_business: number;
  logo: string;
  logo_url: string;
  setting: Setting2;
}

export interface Setting2 {
  id: number;
  format_date: string;
  time_zone: string;
  company_id: number;
  locale: string;
}
