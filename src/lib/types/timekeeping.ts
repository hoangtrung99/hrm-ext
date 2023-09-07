export type TimekeepingData = {
  id: number;
  employee_id: number;
  start_time: string;
  end_time: string;
  date: string;
  total_time_work: string;
  total_time_work_without_time_off: string;
  late_time: string;
  time_early: string;
  type: number;
  overtime: OvertimeType;
  leave_form_has_timesheets: string;
  compensatory_leave_has_timesheet: string;
};

export type OvertimeSalaryCoefficientsType = {
  id: number;
  overtime_id: number;
  start_time: string;
  end_time: string;
  salary_coefficient: number;
  total_time_work: number;
  working_time: number;
  type_time?: number;
};

export type OvertimeType = {
  id: number;
  employee_id: number;
  timesheet_id: number;
  start_time: string;
  end_time: string;
  reason: string;
  note: string;
  status: number;
  total_time_work: string;
  approver_id: number;
  approval_date: string;
  coefficient_salary: number;
  overtime_salary_coefficients: [];
};
