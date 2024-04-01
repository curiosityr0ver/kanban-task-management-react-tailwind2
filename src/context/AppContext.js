/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import data from '../data.json';
import { projects as p, tasks as t, columns as c } from './data2.js';
const { boards } = data;
// console.log(data2);
export const AppContext = createContext(null);
export const AppContextProvider = (props) => {
    const [loggedIn, setLoggedIn] = useState(null);
    const [columns, setColumns] = useState(c);
    const [projects, setProjects] = useState(p);
    const [activeProject, setActiveProject] = useState(0);
    const [tasks, seTtasks] = useState(t);

    const addProject = (project) => {
        setProjects([...projects, project]);
    };
    const removeProject = (project) => {
        setProjects(projects.filter(p => p.id !== project.id));
    };
    const editProject = (project) => {
        const index = projects.findIndex(p => p.id === project.id);
        projects[index] = project;
        setProjects([...projects]);
    };
    const setProjectActive = (project) => {
        setActiveProject(project);
    };
    const addTask = (task) => {
        seTtasks([...tasks, task]);
    };
    const removeTask = (task) => {
        seTtasks(tasks.filter(t => t.id !== task.id));
    };
    const editTask = (task) => {
        const index = tasks.findIndex(t => t.id === task.id);
        tasks[index] = task;
        seTtasks([...tasks]);
    };
    const dragTask = (colIndex, prevColIndex, taskIndex) => {
        // const newProjects = { ...projects };
        const project = boards[activeProject];
        const prevCol = project.columns.find((col, i) => i === prevColIndex);
        const nextCol = project.columns.find((col, i) => i === colIndex);
        console.log(prevCol, nextCol);
        // const task = prevCol.tasks.splice(taskIndex, 1)[0];
        // console.log(prevCol.tasks);
        // console.log(prevCol.tasks, nextCol.tasks);
    };

    return (
        <AppContext.Provider
            value={{
                projects,
                setProjects,
                activeProject,
                setActiveProject,
                columns,
                setColumns,
                tasks,
                seTtasks,
                dragTask,
                loggedIn,
                setLoggedIn
                // setBoards,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
