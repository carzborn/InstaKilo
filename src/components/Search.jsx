import { useEffect, useState } from "react";

import { db } from "../firebase/index";
import { collection, query, getDocs } from "firebase/firestore";

import { ActionIcon, Autocomplete } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconSearch } from "@tabler/icons";

const Search = () => {
  const [value, setValue] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      setUsers(
        querySnapshot.docs.map((doc) => ({
          value: doc.data().displayName,
        }))
      );
    };

    getUsers();
  }, []);

  const navigate = useNavigate();
  const openProfile = () => {
    navigate(`/user/${value}`);
  };

  return (
    <>
      <Autocomplete
        placeholder="Search"
        limit={5}
        radius="sm"
        value={value}
        onChange={setValue}
        data={users}
        onSubmit={openProfile}
        initiallyOpened={false}
        rightSection={
          <ActionIcon size="sm" onClick={openProfile}>
            <IconSearch size="md" />
          </ActionIcon>
        }
        nothingFound="Cannot find user"
      />
    </>
  );
};

export default Search;
