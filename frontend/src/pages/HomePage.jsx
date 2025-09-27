import React from "react";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import RateLimitedUI from "../components/RateLimitedUI.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard.jsx";
import { NotebookIcon } from "lucide-react";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/notes");
        setNotes(res.data);
        console.log(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("you faced an error", error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, []);
  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}
      {isLoading && (
        <div className="text-center text-primary py-10"> Loading notes...</div>
      )}
      {notes.length > 0 && !isRateLimited && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              id={note._id}
              title={note.title}
              content={note.content}
              createdAt={note.createdAt}
              setNotes={setNotes}
            />
          ))}
        </div>
      )}
      {notes.length === 0 && (
        <>
          <div className="flex flex-col h-1/2 min-h-[50vh] justify-center items-center ">
            <div className="bg-primary/10 p-8 rounded-full">
              <NotebookIcon className="size-10 text-primary" />
            </div>
            <div className="text-white font-bold">No notes to display</div>
            <div className="text-gray-400">Maybe you should create some?</div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
