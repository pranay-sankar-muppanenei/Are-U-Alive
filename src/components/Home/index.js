"use client";

import { useState } from "react";
import TypingText from "@/helpers/TypingText";
import { MdOutlineDone } from "react-icons/md";
import { FaGhost, FaPenToSquare } from "react-icons/fa6";
import { OctagonAlert } from "lucide-react";

export default function Home() {
  const [checkIn, setCheckIn] = useState(false);

  const handleCheckin = () => {
    if (checkIn) return;

    setCheckIn(true);

    const audio = new Audio("/cashier.mp3");
    audio.volume = 0.9;
    audio.play().catch(() => {});
  };

  return (
    <main className="flex-1 flex items-center justify-center px-4">
      <div className="space-y-14 text-center">

        {/* Inputs */}
        <div className="flex justify-center gap-6">
          <InputWithIcon placeholder="Your name" />
          <InputWithIcon placeholder="Emergency contact email" />
        </div>

        {/* Check-in button */}
        <button
          onClick={handleCheckin}
          aria-pressed={checkIn}
          title={checkIn ? "Checked in for today" : "Tap to check in"}
          className={
            "w-62 h-62 rounded-full flex items-center justify-center m-auto " +
            "transition-all duration-300 ease-out " +
            (checkIn
              ? "bg-[#8ce6a4] cursor-not-allowed"
              : "bg-[#06c739] cursor-pointer " +
                "shadow-[0_0_0_10px_rgba(185,235,206,0.9)] " +
                "hover:scale-105 " +
                "hover:shadow-[0_0_0_15px_rgba(185,235,206,0.9)]")
          }
        >
          <div className="flex flex-col items-center">
            {checkIn ? (
              <>
                <MdOutlineDone className="text-[100px] text-white transition-all duration-300 scale-100 opacity-100" />
                <p className="text-white text-[20px] font-bold mt-2">
                  Check-in <br /> Successful
                </p>
              </>
            ) : (
              <>
                <FaGhost className="w-18 h-18 text-white" />
                <p className="text-white text-[20px] font-bold mt-2">
                  Check in today
                </p>
              </>
            )}
          </div>
        </button>

        {/* Typing message 
        {checkIn && (
          <TypingText
            text="Come back alive..."
            speed={100}
            className="text-black text-[20px] font-semibold"
          />
        )}
          */}

        {/* Notification card */}
        <div className="bg-[#dedbc3] max-w-[600px] flex items-start gap-3 p-3 m-auto mt-8 rounded">
          <OctagonAlert className="text-green-600 shrink-0" />
          <p className="text-gray-800 text-lg text-left">
            If you haven’t checked in for 2 consecutive days, the system will
            automatically send an email to your emergency contact the next day.
          </p>
        </div>

      </div>
    </main>
  );
}

const maskEmail = (email) => {
  if (!email.includes("@")) return email;

  const [name, domain] = email.split("@");

  if (name.length <= 4) {
    return name[0] + "***@" + domain;
  }

  const first = name.slice(0, 2);
  const last = name.slice(-2);

  return `${first}****${last}@${domain}`;
};


/* Small reusable input */
function InputWithIcon({ placeholder }) {
  const [value, setValue] = useState("");
  const [isEditing, setIsEditing] = useState(true);

  const isEmail = placeholder.toLowerCase().includes("email");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && value.trim()) {
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center gap-2 min-w-[220px]">
      {isEditing ? (
        <>
          <input
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="outline-none text-sm border-b border-gray-100 pb-1"
            autoFocus
          />
          <FaPenToSquare className="text-gray-500 text-sm" />
        </>
      ) : (
        <>
          <p className="text-sm font-medium text-gray-800">
            {isEmail ? maskEmail(value) : value}
          </p>
          <FaPenToSquare
            className="text-gray-400 text-sm cursor-pointer"
            onClick={() => setIsEditing(true)}
          />
        </>
      )}
    </div>
  );
}

