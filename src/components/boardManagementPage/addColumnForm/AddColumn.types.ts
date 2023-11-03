export type TAddColumnFormProps = {
  onSubmit: (data: TAddColumnFormValues) => void;
  onClose: () => void;
};

export type TAddColumnFormValues = {
  columnName: string;
};
