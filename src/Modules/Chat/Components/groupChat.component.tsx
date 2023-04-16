import { useQuery } from "react-query";
import { FormInterface } from "../../../Composites/FormBuilder/Types/form.types";
import FormBuilder from "../../../Composites/FormBuilder/formBuilder";
import { asyncService, sendRequest } from "../../../Utils/service.utils";
import { parseSelectBoxValue } from "../../../Components/SelectBox/selecBox.component";
import { useCallback } from "react";
import useUser from "../../../Hooks/useUser.hook";
import { EmptyFunction } from "../../../Utils/common.utils";
import ModalUtil from "../../../Utils/modal.utils";
import Toast from "../../../Utils/toast.utils";

const GroupChat = () => {
  const { user: currentUser } = useUser();
  const { data: response } = useQuery(["users"], () =>
    asyncService({
      end_point: "users",
      method: "get",
    })
  );

  const users = (response as any)?.data;

  const sanitizeData = useCallback(() => {
    return (users || [])
      .map((user: any) => {
        return {
          ...user,
          full_name: `${user?.profile?.first_name} ${user?.profile?.last_name}`,
        };
      })
      .filter((user: any) => user?.id !== currentUser?.id);
  }, [currentUser?.id, users]);

  const handleSubmit = async (values: any, next: any = EmptyFunction) => {
    const users = values?.users?.map((user: any) => {
      return { user_id: user?.value };
    });
    const { success, response } = await sendRequest({
      end_point: "chats",
      method: "post",
      classParams: {
        users: users,
        title: values?.title,
        is_group: true,
      },
    });
    if (success) {
      Toast.success({ message: "Create New group" });
      ModalUtil.close();
    }
    next();
  };

  const formSchema: FormInterface = {
    handleSubmit,
    fields: [
      {
        name: "title",
        label: "Group Name",
        type: "text",
        placeholder: "Enter group name",
        isRequired: true,
      },
      {
        name: "users",
        label: "Select Friends",
        type: "select",
        placeholder: "Select Friends",
        isMultiple: true,
        options: parseSelectBoxValue(sanitizeData(), "full_name", "id"),
        isRequired: true,
      },
    ],
  };

  return (
    <div className="min-w-[400px] min-h-[300px] col-flex gap-4 relative">
      <div className="text-xl font-bold text-info">New Group Chat</div>
      <FormBuilder {...formSchema} />
    </div>
  );
};

export default GroupChat;
