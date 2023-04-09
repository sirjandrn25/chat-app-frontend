import { useEffect, useRef, useState } from "react";
import { SelectOptionType } from "../../../src/Components/SelectBox/selecBox.component";
import FormBuilder from "../../../src/Composites/FormBuilder/formBuilder";
import { FormInterface } from "../../../src/Composites/FormBuilder/Types/form.types";
import SlidingPaneUtil from "../../../src/Utils/slidingPane.utils";
import Button from "../../../src/Components/Button/button.component";

const Product = () => {
  const [title, setTitle] = useState("This is Title");
  const formRef = useRef<any>();

  useEffect(() => {
    SlidingPaneUtil.updateProps({ headingTitle: title });
  }, [title]);
  const country_options: SelectOptionType[] = [
    { value: 1, label: "Nepal" },
    { value: 2, label: "India" },
    { value: 3, label: "America" },
  ];
  const form_props: FormInterface = {
    fields: [
      {
        name: "first_name",
        label: "First Name",
        type: "text",
        isRequired: true,
      },
      {
        name: "last_name",
        label: "Last Name",
        type: "text",
      },

      {
        name: "email",
        label: "Email Address",
        type: "email",
        isRequired: true,
      },
      {
        name: "password",
        label: "Password",
        type: "password",
        isRequired: true,
        validation: {
          minLength: 10,
          maxLength: 20,
        },
      },
      {
        name: "country",
        label: "Country",
        type: "select",
        options: country_options,
        isRequired: true,
        isMultiple: true,
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
      },
    ],
    layout: "two",
    handleSubmit: (data: any) => {},
  };

  return (
    <div className="gap-10 col-flex">
      <FormBuilder {...form_props} ref={formRef} />
      <Button
        onClick={() => {
          // formRef?.current?.onSubmit();
        }}
      >
        Extra Submit
      </Button>
    </div>
  );
};

export default Product;
