import { ComputedRef, Ref } from "vue";

export type configType = "select" | "input" | "datePicker" | "switch";
export type datePickerType =
  | "year"
  | "month"
  | "date"
  | "dates"
  | "datetime"
  | "week"
  | "datetimerange"
  | "daterange"
  | "monthrange";
export type selectListItem = {
  name: string;
  id: string | number;
};

export type configItem = {
  type: configType;
  valueProp: string;
  title: string;
  selectList?:
    | selectListItem[]
    | ComputedRef<selectListItem[]>
    | Ref<selectListItem[]>;
  placeholder?: string;
  extra?: datapickerConfig;
  multiple?: boolean;
  loading?: boolean | Ref<boolean> | ComputedRef<boolean>;
};

export type datapickerConfig = {
  startPlaceholder?: string;
  endPlaceholder?: string;
  datePickerType?: datePickerType;
  format?: string;
  valueFormat?: string;
  defaultValue?: Date | [Date, Date];
  disabledDate?: (date: Date) => boolean;
};
