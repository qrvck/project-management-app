export type TAddColumnFormProps = {
  isOpen: boolean;
  onSubmit: (data: TAddColumnFormValues) => void;
  onClose: () => void;
};

export type TAddColumnFormValues = {
  columnName: string;
};
