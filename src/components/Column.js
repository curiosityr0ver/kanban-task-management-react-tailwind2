import React, { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { AppContext } from "../context/AppContext";
import boardsSlice from "../redux/boardsSlice";
import Task from "./Task";

function Column({ colIndex }) {
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-indigo-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-sky-500",
  ];


  const dispatch = useDispatch();
  const { projects, tasks, activeProject, columns, dragTask } = useContext(AppContext);
  const board = projects[activeProject];
  const col = columns.find((col, i) => i === colIndex);
  const relevantTasks = tasks.filter(task => task.projectId === activeProject && task.status === col);


  const handleOnDrop = (e) => {
    const { prevColIndex, taskIndex } = JSON.parse(
      e.dataTransfer.getData("text")
    );
    const statusMap = [
      "TO DO",
      "IN PROGRESS",
      "IN QA",
      "DONE",
    ];
    console.log(colIndex, prevColIndex, taskIndex);
    // console.log(statusMap[colIndex], statusMap[prevColIndex], taskIndex);
    const filteredTasks = tasks.filter(task => task.projectId === activeProject);
    console.log(filteredTasks.filter(task => task.status === statusMap[colIndex]));
    console.log(filteredTasks.filter(task => task.status === statusMap[prevColIndex]));


    if (colIndex !== prevColIndex) {
      dragTask(colIndex, prevColIndex, taskIndex);
      // dispatch(
      //   boardsSlice.actions.dragTask({ colIndex, prevColIndex, taskIndex })
      // );
    }
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      className="mx-15 pl-[5px] pt-[16px] mt-[90px] min-w-[290px] bg-gray-200 rounded-lg"
    >
      <p className=" font-bold flex  items-center  gap-1 text-[#828fa3]">
        <div className={`rounded-full w-4 h-4 ${colors[Math.floor(Math.random() * colors.length)]} `} />
        {col}<span className="text-gray-600">
          {relevantTasks.length}
        </span>
      </p>

      {relevantTasks.map((task, index) => (
        <Task key={index} taskIndex={index} colIndex={colIndex} />
      ))}
    </div>
  );
}

export default Column;
