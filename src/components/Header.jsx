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

  const toggleDropdown = () => {
    setShowDropdown((isOpen) => !isOpen);
  };

  const handleSignOut = () => {
    setSelectedUser("");
    setShowDropdown(false);
  };

  return (
    <header className="w-full bg-cardcolor text-left py-3 sm:py-5 md:py-7 flex space-x-4 justify-between items-center">
      <h1 className="px-1 text-lg font-extrabold text-gray-800 sm:text-3xl md:text-3xl tracking-tight">
        The Code Chronicles
      </h1>
      <ul className="flex justify-end">
        <li className="flex justify-end items-center space-x-2 border-b-2 border-transparent hover:border-black mr-1">
          <img
            src={
              selectedUser
                ? `/assets/${selectedUser}.png`
                : "/assets/pngegg.png"
            }
            alt={selectedUser ? `Logged in as ${selectedUser}` : "Login"}
            className="w-6 h-6 md:w-10 md:h-10 lg:w-14 lg:h-14 cursor-pointer hover:opacity-80 transition-all duration-300 ease-in-out"
            onClick={toggleDropdown}
          />
          <span>{selectedUser ? "" : "Sign in"}</span>

          {showDropdown && (
            <ClickAwayListener onClickAway={() => setShowDropdown(false)}>
              <Paper
                className="absolute top-14  md:top-24 lg:top-28 right-0 bg-white border rounded-lg shadow-lg w-48 z-50 transition-all duration-300 ease-in-out"
                style={{ overflow: "visible" }}
              >
                <MenuList>
                  {usernames.map((username) => (
                    <MenuItem
                      className="gap-2"
                      key={username}
                      onClick={() => {
                        setSelectedUser(username);
                        setShowDropdown(false);
                      }}
                    >
                      <img
                        src={`/assets/${username}.png`}
                        alt={
                          selectedUser
                            ? `Logged in as ${selectedUser}`
                            : "Login"
                        }
                        className=" w-6 h-6 md:w-12 md:h-12 lg:w-15 lg:h-15 cursor-pointer hover:opacity-80 transition-all duration-300 ease-in-out"
                        onClick={() => setShowDropdown((prev) => !prev)}
                      />
                      {username}
                    </MenuItem>
                  ))}
                  {selectedUser && (
                    <MenuItem key="signout" onClick={handleSignOut}>
                      <img
                        src="/assets/signout.png"
                        alt={
                          selectedUser
                            ? `Logged in as ${selectedUser}`
                            : "Login"
                        }
                        className=" w-6 h-6 md:w-12 md:h-12 lg:w-15 lg:h-15 cursor-pointer hover:opacity-80 transition-all duration-300 ease-in-out mr-2"
                        onClick={() => setShowDropdown((prev) => !prev)}
                      />
                      <div> Sign Out</div>
                    </MenuItem>
                  )}
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
