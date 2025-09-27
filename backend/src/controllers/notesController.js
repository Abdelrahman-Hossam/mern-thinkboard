import Note from "../models/Note.js";

export const getNotes = async (_, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); //-1 will sort in desc order (newest is displayed first)
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getNotes controller", error);
    res.status(500).json({ message: "Internet server error " });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const fetchedNote = await Note.findById(req.params.id);
    if (!fetchedNote) {
      res.status(404).json({ message: "error 404 note not found" });
    }
    res.status(200).json(fetchedNote);
  } catch (error) {
    console.error("Error while getting note by ID", error);
    res.status(500).json({ message: "failed to get note by id" });
  }
};
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;  
    const note = new Note({ title, content });
    const savedNote = await note.save(); //save to the DB
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNote controller", error);
    res.status(500).json({ message: "Internet server error " });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true }
    );
    if (!updatedNote) {
      res.status(404).json({ message: "Note not found!" });
    }
    res.status(200).json({ message: "Note updated Successfully" });
  } catch (error) {
    console.error("Error in updating note", error);
    res.status(500).json({ message: "Internal server error " });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note has been deleted!" });
  } catch (error) {
    console.error("Error in deleteNote controller", error);
    res.status(500).json({ message: "Internet server error " });
  }
};
