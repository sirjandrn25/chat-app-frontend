import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
} from "react";
import Button from "../../Components/Button/button.component";
import { EmptyFunction } from "../../Utils/common.utils";
import getSchemaElement from "./Components/getSchemaElement.component";
import useForm from "./Hooks/useForm.hook";
import { FormInterface, SchemaType } from "./Types/form.types";

const FormBuilder = forwardRef(
  (
    {
      fields,
      data,
      layout = "one",
      className = "",
      handleSubmit = EmptyFunction,
      realTimeValidate = false,
      submitLabel,
      ...rest
    }: FormInterface,
    ref: any
  ) => {
    const { error, handleFormData, formData, onSubmit } = useForm(
      fields,
      data,
      handleSubmit,
      realTimeValidate
    );
    useImperativeHandle(
      ref,
      () => {
        onSubmit: onSubmit;
      },
      [onSubmit]
    );

    const hasError = useCallback(
      (key: string) => {
        return typeof error[key] !== "undefined";
      },
      [error]
    );

    const renderSchemaElement = useCallback(
      (
        field: SchemaType,
        index: number | string,
        formDataKey: string = ""
      ): any => {
        if (field?.type === "object" && field?.formSchema) {
          return renderSchemaElement(
            field?.formSchema,
            index + field.name,
            formDataKey
              ? `${formDataKey}.${field?.formSchema?.name}`
              : formDataKey
          );
        }
        const Element = getSchemaElement(field?.type);
        return (
          <div key={field.name || index} className={field.name}>
            <Element
              {...field}
              onChange={(value: any) => {
                handleFormData(formDataKey, value);
              }}
              value={formData[field?.name]}
              error={hasError(field.name)}
              errorMessage={error[field?.name]}
            />
          </div>
        );
      },
      [error, formData, handleFormData, hasError]
    );

    const renderSchema = useCallback(() => {
      return fields.map((field, index: number) => {
        return renderSchemaElement(field, index, field?.name);
      });
    }, [fields, renderSchemaElement]);
    const layoutClass = useMemo(() => {
      let className = `gap-4 grid`;
      switch (layout) {
        case "two":
          return `${className} grid-cols-2`;
        case "three":
          return `${className} grid-cols-3`;
        default:
          return `${className} grid-cols-1`;
      }
    }, [layout]);
    function children(arg0: {
      onSubmit: (next?: any) => void;
      error: any;
      formData: any;
    }): import("react").ReactNode {
      throw new Error("Function not implemented.");
    }

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        ref={ref}
      >
        <div className={`p-4 flex flex-col gap-4 ${className} `}>
          <div className={layoutClass}>{renderSchema()}</div>
          {rest?.children ? (
            children({ onSubmit, error, formData })
          ) : (
            <Button progress onClick={onSubmit}>
              {submitLabel || "Save"}
            </Button>
          )}
        </div>
      </form>
    );
  }
);
FormBuilder.displayName = "FormBuilder";
export default memo(FormBuilder);
