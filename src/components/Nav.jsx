import { Link, useLocation } from "react-router-dom";
import { getUsers } from "../../api";
import { useState, useEffect } from "react";
import {
  MenuList,
  MenuItem,
  Paper,
  ClickAwayListener,
} from "@mui/material";

const Nav = ({ topics, selectedUser, setSelectedUser }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [usernames, setUsernames] = useState([]);

  const topicsArray = topics.map((topic) => topic.slug);

  const location = useLocation();

  const linkText =
    "px-8 py-4 text-lg font-semibold block min-h-auto min-w-auto text-sm sm:text-base md:text-2xl lg:text-3xl";

  const currentCategory = location.pathname.split("/").pop();

  const getButtonStyle = (buttonName) => {
    if (topicsArray.includes(currentCategory) && buttonName === "articles") {
      return "bg-fluorescent-yellow rounded-lg";
    }
    return currentCategory === buttonName
      ? "bg-fluorescent-yellow rounded-lg"
      : "bg-buttonpink rounded-lg";
  };

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
    <header className="bg-bgcolor rounded-lg p-4 w-full">
      <nav aria-label="Main Navigation">
        <ul className="flex space-x-10 mx-auto justify-center w-full">
          <li className="transform hover:scale-105 transition-all">
            <Link to="/" className={`${linkText} ${getButtonStyle("")}`}>
              Home
            </Link>
          </li>

          <li className="transform hover:scale-105 transition-all">
            <Link
              to="/articles"
              className={`${linkText} ${getButtonStyle("articles")}`}
            >
              Articles
            </Link>
          </li>

          <li className="relative">
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className={`px-8 py-3 text-sm font-semibold block min-h-auto min-w-auto rounded-lg hover:bg-fluorescent-yellow hover:text-black transition-all ${getUserButtonStyle()}`}
              aria-label="Toggle User Menu"
              style={{
                maxWidth: "200px", 
                wordWrap: "break-word", 
              }}
            >

              {selectedUser || "Login"}
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
      </nav>
    </header>
  );
};

export default Nav;
