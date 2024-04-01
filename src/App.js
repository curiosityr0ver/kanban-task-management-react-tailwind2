import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import Home from "./components/Home";
import HomePage from "./components/HomePage";
import Project from "./components/Project";
import boardsSlice from "./redux/boardsSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive);
  if (!activeBoard && boards.length > 0)
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/task-view" element=
          {
            <div className=" overflow-hidden  overflow-x-scroll">
              <Header
                setIsBoardModalOpen={setIsBoardModalOpen}
                isBoardModalOpen={isBoardModalOpen}
              />
              <Home
                setIsBoardModalOpen={setIsBoardModalOpen}
                isBoardModalOpen={isBoardModalOpen}
              />
            </div>
          }
        />
        <Route path="/" element=
          {
            <HomePage />
          }
        />
        <Route path="/dashboard" element=
          {
            <Project />
          }
        />
      </Routes>

    </BrowserRouter>

  );
}

export default App;
