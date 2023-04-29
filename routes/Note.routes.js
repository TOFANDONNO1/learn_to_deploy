const express = require("express");
const { NoteModel } = require("../model/Note.model");

const noteRouter = express.Router();

noteRouter.post("/create", async (req, res) => {
  try {
    const note = new NoteModel(req.body);
    await note.save();
    res.status(200).send({ message: "note created successfully" });
  } catch (error) {
    res.status(400).send({ message: "some error" });
  }
});

noteRouter.get("/", async (req, res) => {
  try {
    const note = await NoteModel.find({ authorID: req.body.authorID });
    if (!note) {
      res.send("Note not found");
    }
    res.send(note);
  } catch (error) {
    res.send(error);
  }
});

noteRouter.patch("/update/:id", async (req, res) => {
    const {id}=req.params
  const note = await NoteModel.findOne({ _id:id });
  try {
    if (req.body.authorID !== note.authorID) {
      res.status(200).send({ "message": "You are not authorized to access this action" });
    } else {
     await NoteModel.findByIdAndUpdate({ _id:id },req.body);

      res.status(200).send({ "msg": `The note with id ${id} has been updated` });
    }
  } catch (error) {
    res.send(error);
  }
});

noteRouter.delete("/delete/:id", async (req, res) => {
    const {id}=req.params;
  const note = await NoteModel.findOne({ _id:id });

  try {
    if (req.body.authorID !== note.authorID) {

        res.status(200).send({ "message": "You are not authorized to access this action" });

    }else{
        await NoteModel.findByIdAndDelete({ _id:id });
        res.status(200).send({ "msg": `The note with id ${id} has been deleted` });

    }

  
    
  } catch (error) {
    res.send(error);
  }
});

module.exports = { noteRouter };
