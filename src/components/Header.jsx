import { useState, useEffect } from "react";
import { getUsers } from "../../api";
import { MenuList, MenuItem, Paper, ClickAwayListener } from "@mui/material";

const Header = ({ selectedUser, setSelectedUser }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [usernames, setUsernames] = useState([]);


  useEffect(() => {
    getUsers()
      .then((data) => {
        const usernamesFromApi = data.map((user) => user.username);
        setUsernames(usernamesFromApi);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, []);

  const getUserButtonStyle = () => {
    return selectedUser
      ? "bg-fluorescent-yellow text-black"
      : "bg-buttonpink text-black";
  };
  return (

    <header className="w-full max-w-[90%] sm:max-w-[80%] md:max-w-[70%] bg-cardcolor text-left py-8 sm:py-10 md:py-12 rounded-lg flex space-x-4 justify-between">
      <h1 className="px-4 text-4xl font-bold text-gray-800 sm:text-5xl md:text-6xl w-full">
        NEWS ATTACK
      </h1>
      <ul className="flex justify-end">
      <li className="flex justify-end">
        <button
          onClick={() => setShowDropdown((prev) => !prev)}
          className={`px-1 py-1 text-xs font-semibold block min-h-auto min-w-auto rounded-lg hover:bg-fluorescent-yellow hover:text-black transition-all ${getUserButtonStyle()}`}
          aria-label="Toggle User Menu"
          style={{
            maxWidth: "200px",
            wordWrap: "break-word",
          }}
        >
          {selectedUser ? `Logged in as ${selectedUser}` : "Login"}
        </button>

        {showDropdown && (
          <ClickAwayListener onClickAway={() => setShowDropdown(false)}>
            <Paper
              className="absolute top-12 left-0 bg-white border rounded-lg shadow-lg w-48 z-50"
              style={{ overflow: "visible" }}
            >
              <MenuList>
                {usernames.map((username) => (
                  <MenuItem
                    key={username}
                    onClick={() => {
                      setSelectedUser(username);
                      setShowDropdown(false);
                    }}
                  >
                    {username}
                  </MenuItem>
                ))}
              </MenuList>
            </Paper>
          </ClickAwayListener>
        )}
      </li>
      </ul>
    </header>
  );
};

export default Header;
