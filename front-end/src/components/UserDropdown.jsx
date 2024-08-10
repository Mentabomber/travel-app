import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function UserDropdown() {
  const { handleLogout, user } = useAuth();
  const [open, setOpen] = useState(false);
  function ProfileLink({ href, children }) {
    return (
      <Link
        to={href}
        className="text-white text-sm border-b border-transparent hover:border-white duration-300 transition-all"
      >
        {children}
      </Link>
    );
  }
  return (
    <>
      {/* backdrop */}
      {open && (
        <div
          className="fixed inset-0 h-screen "
          onClick={() => setOpen(false)}
        ></div>
      )}

      <div
        className="flex items-center relative ml-4 pr-4 bg-white hover:bg-gray-100 hover:text-red-500 cursor-pointer text-sm"
        /* onMouseOver={() => setOpen(true)}
      onMouseOut={() => setOpen(false)} */
      >
        <div
          className="flex items-center gap-2"
          onClick={() => setOpen((value) => !value)}
        >
          <img
            src="https://picsum.photos/200"
            alt="user"
            className="rounded overflow-hidden w-10 h-10"
          />
          <div>{user.email}</div>
        </div>

        <div
          className={
            "user-dropdown absolute right-0 top-full text-black bg-white shadow rounded-md py-6 min-w-[190px] flex-col " +
            (open ? "flex" : "hidden")
          }
        >
          <ProfileLink href="/dashboard">
            <span className="user-dropdown__item px-8 py-3 hover:underline hover:bg-gray-100 cursor-pointer text-black">
              Dashboard
            </span>
          </ProfileLink>
          <a
            className="user-dropdown__item px-8 py-3 hover:underline hover:bg-gray-100 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </a>
        </div>
      </div>
    </>
  );
}
