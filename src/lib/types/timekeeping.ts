export interface TimekeepingData {
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
  overtime: string;
  leave_form_has_timesheets: string;
  compensatory_leave_has_timesheet: string;
}
