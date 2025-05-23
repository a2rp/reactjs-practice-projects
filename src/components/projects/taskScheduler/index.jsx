import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

// Styled Components
const Container = styled.div`
    background-color: #fff;
    color: #000;
    padding: 30px;
    max-width: 900px;
    margin: auto;
`;

const Main = styled.div`
    max-width: 1000px;
    margin: auto;
`;

const Heading = styled.h2`
    text-align: center;
    margin-bottom: 30px;
`;

const InputTaskContainer = styled.form`
    display: grid;
    gap: 15px;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    margin-bottom: 30px;
`;

const SubmitButton = styled(Button)`
    height: 56px;
`;

const TaskListContainer = styled.div`
    margin-top: 40px;
`;

const TaskListHeading = styled.h3`
    margin-bottom: 20px;
`;

const TaskScheduler = () => {
    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState("");
    const [taskPriority, setTaskPriority] = useState("Low Priority");
    const [taskDate, setTaskDate] = useState("");
    const [tomorrowDate, setTomorrowDate] = useState("");
    const [weekDate, setWeekDate] = useState("");
    const [taskSelect, setTaskSelect] = useState("All Tasks");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const allTasks = JSON.parse(localStorage.getItem("task-scheduler"));
        setTasks(allTasks || []);
    }, []);

    useEffect(() => {
        const allTasks =
            JSON.parse(localStorage.getItem("task-scheduler")) || [];

        let filteredTasks = allTasks;
        switch (taskSelect) {
            case "Low Priority Tasks":
                filteredTasks = allTasks.filter(
                    (task) => task.taskPriority === "Low Priority"
                );
                break;
            case "Medium Priority Tasks":
                filteredTasks = allTasks.filter(
                    (task) => task.taskPriority === "Medium Priority"
                );
                break;
            case "High Priority Tasks":
                filteredTasks = allTasks.filter(
                    (task) => task.taskPriority === "High Priority"
                );
                break;
            case "Completed Tasks":
                filteredTasks = allTasks.filter(
                    (task) => task.taskDone === true
                );
                break;
            case "Available Tasks":
                filteredTasks = allTasks.filter(
                    (task) => task.taskDone === false
                );
                break;
            default:
                break;
        }
        setTasks(filteredTasks);
    }, [taskSelect]);

    useEffect(() => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        setTomorrowDate(tomorrow.toISOString().split("T")[0]);
        setTaskDate(tomorrow.toISOString().split("T")[0]);

        const week = new Date(today);
        week.setDate(week.getDate() + 7);
        setWeekDate(week.toISOString().split("T")[0]);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (taskName.trim().length === 0) {
            return toast.warn("Task name can not be empty");
        }

        const data = {
            id: uuidv4(),
            taskName,
            taskPriority,
            taskDate,
            taskDone: false,
        };

        setIsLoading(true);
        setTimeout(() => {
            const oldTasks =
                JSON.parse(localStorage.getItem("task-scheduler")) || [];
            oldTasks.push(data);
            localStorage.setItem("task-scheduler", JSON.stringify(oldTasks));
            setTasks(oldTasks);
            setIsLoading(false);
        }, 3000);
    };

    const handleUpdateTask = (task) => {
        Swal.fire({
            title: "Do you want to mark as done?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No`,
        }).then((result) => {
            if (result.isConfirmed) {
                const stored = JSON.parse(
                    localStorage.getItem("task-scheduler")
                );
                const updated = stored.map((item) =>
                    item.id === task.id ? { ...item, taskDone: true } : item
                );
                localStorage.setItem("task-scheduler", JSON.stringify(updated));
                setTasks(updated);
            }
        });
    };

    const handleDeleteTask = (task) => {
        Swal.fire({
            title: "Do you want to delete?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Don't delete`,
        }).then((result) => {
            if (result.isConfirmed) {
                const stored = JSON.parse(
                    localStorage.getItem("task-scheduler")
                );
                const updated = stored.filter((item) => item.id !== task.id);
                localStorage.setItem("task-scheduler", JSON.stringify(updated));
                setTasks(updated);
            }
        });
    };

    return (
        <Container>
            <Main>
                <Heading>Task Scheduler</Heading>

                <InputTaskContainer onSubmit={handleSubmit}>
                    <TextField
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        label="Write task here"
                        fullWidth
                    />

                    <FormControl fullWidth>
                        <InputLabel id="priority-select-label">
                            Priority
                        </InputLabel>
                        <Select
                            value={taskPriority}
                            onChange={(e) => setTaskPriority(e.target.value)}
                            labelId="priority-select-label"
                            label="Priority"
                        >
                            <MenuItem value="Low Priority">
                                Low Priority
                            </MenuItem>
                            <MenuItem value="Medium Priority">
                                Medium Priority
                            </MenuItem>
                            <MenuItem value="High Priority">
                                High Priority
                            </MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        type="date"
                        value={taskDate}
                        onChange={(e) => setTaskDate(e.target.value)}
                        fullWidth
                        InputProps={{
                            inputProps: {
                                min: tomorrowDate,
                                max: weekDate,
                            },
                        }}
                    />

                    <SubmitButton
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress /> : "Submit"}
                    </SubmitButton>
                </InputTaskContainer>

                <TaskListContainer>
                    <TaskListHeading>Task List</TaskListHeading>
                    <FormControl sx={{ width: "250px", marginBottom: "20px" }}>
                        <InputLabel id="task-select">Select tasks</InputLabel>
                        <Select
                            value={taskSelect}
                            onChange={(e) => setTaskSelect(e.target.value)}
                            labelId="task-select"
                            label="Select tasks"
                        >
                            <MenuItem value="All Tasks">All tasks</MenuItem>
                            <MenuItem value="Low Priority Tasks">
                                Low Priority
                            </MenuItem>
                            <MenuItem value="Medium Priority Tasks">
                                Medium Priority
                            </MenuItem>
                            <MenuItem value="High Priority Tasks">
                                High Priority
                            </MenuItem>
                            <MenuItem value="Completed Tasks">
                                Completed
                            </MenuItem>
                            <MenuItem value="Available Tasks">
                                Available
                            </MenuItem>
                        </Select>
                    </FormControl>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#000" }}>
                                    <TableCell sx={{ color: "#fff" }}>
                                        ID
                                    </TableCell>
                                    <TableCell sx={{ color: "#fff" }}>
                                        Task
                                    </TableCell>
                                    <TableCell sx={{ color: "#fff" }}>
                                        Priority
                                    </TableCell>
                                    <TableCell sx={{ color: "#fff" }}>
                                        Date
                                    </TableCell>
                                    <TableCell sx={{ color: "#fff" }}>
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tasks.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>{row.taskName}</TableCell>
                                        <TableCell>
                                            {row.taskPriority}
                                        </TableCell>
                                        <TableCell>{row.taskDate}</TableCell>
                                        <TableCell>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    gap: "10px",
                                                }}
                                            >
                                                <Button
                                                    variant="contained"
                                                    onClick={() =>
                                                        handleUpdateTask(row)
                                                    }
                                                    disabled={row.taskDone}
                                                >
                                                    Mark as done
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    onClick={() =>
                                                        handleDeleteTask(row)
                                                    }
                                                >
                                                    Delete
                                                </Button>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TaskListContainer>
            </Main>
        </Container>
    );
};

export default TaskScheduler;
