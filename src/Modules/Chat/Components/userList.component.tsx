import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import Avatar from "../../../Components/Avatar/avatar.component";
import InputField from "../../../Components/Input/inputField.component";
import useChatContext from "../../../Context/Chat/useChat.context";
import useUser from "../../../Hooks/useUser.hook";
import { GetObjectFromArray, IsEmptyObject } from "../../../Utils/common.utils";
import { asyncService } from "../../../Utils/service.utils";
import Toast from "../../../Utils/toast.utils";

const UserList = ({ callback }: any) => {
  const [search, setSearch] = useState("");
  const { chats } = useChatContext();
  const { user: currentUser }: any = useUser();

  const { isLoading, data: response } = useQuery(
    ["users_list", search],
    () =>
      asyncService({
        end_point: `users?search=${search}`,
      }),
    {
      enabled: !!search,
    }
  );

  const { mutate: createChat } = useMutation(
    (chat_data: any) =>
      asyncService({
        end_point: "chats",
        classParams: chat_data,
        method: "post",
      }),
    {
      onSuccess: (data: any) => {
        callback(data);
      },
      onError: (error) => {
        callback();
        Toast.error({ message: "Something is wrong" });
      },
    }
  );
  const { data: users = [] } = (response as any) || {};

  const isUserAlreadyPresent = (user: any) => {
    for (const chat of chats) {
      const exist_chat = GetObjectFromArray(chat.users, "user_id", user.id);

      if (!IsEmptyObject(exist_chat) && !exist_chat?.is_group) {
        return exist_chat;
      }
    }
  };

  const PeopleComp = ({ user }: any) => {
    return (
      <div
        className="gap-2 cursor-pointer row-flex"
        onClick={() => {
          const data = {
            users: [user.id],
          };
          const exist_chat = isUserAlreadyPresent(user);
          if (exist_chat) {
            Toast.warn({
              message: `${user?.profile?.first_name} ${user?.profile?.last_name} is already present is chat`,
            });
            callback();
            return;
          }
          createChat(data);
        }}
      >
        <Avatar />
        <div className="col-flex">
          <div className="font-bold capitalize">
            {user?.profile?.first_name} {user?.profile?.last_name}
          </div>
          <div className="text-xs">{user?.email}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 gap-4 p-4 col-flex">
      <div>
        <InputField
          onDebounceChange={(value) => {
            if (value?.length < 3) return;
            setSearch(value);
          }}
          placeholder=" User name At least 3 charecters required"
          autoFocus
        />
      </div>
      {isLoading && <div>Loading ...</div>}
      {!!search &&
        users.map((user: any) => {
          if (currentUser?.id === user?.id) return null;
          return <PeopleComp key={user?.id} user={user} />;
        })}
    </div>
  );
};

export default UserList;
