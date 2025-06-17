import { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme/theme";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Header from "../../components/Header";

const initialTasks = {
  "to-do": {
    id: "to-do",
    title: "To Do",
    taskIds: ["task-1", "task-2", "task-3"],
  },
  "in-progress": {
    id: "in-progress",
    title: "In Progress",
    taskIds: ["task-4", "task-5"],
  },
  done: {
    id: "done",
    title: "Done",
    taskIds: ["task-6", "task-7"],
  },
};

const initialTaskDetails = {
  "task-1": { id: "task-1", content: "Create new landing page" },
  "task-2": { id: "task-2", content: "Add authentication" },
  "task-3": { id: "task-3", content: "Setup payment gateway" },
  "task-4": { id: "task-4", content: "Design database schema" },
  "task-5": { id: "task-5", content: "Implement search functionality" },
  "task-6": { id: "task-6", content: "Setup CI/CD pipeline" },
  "task-7": { id: "task-7", content: "Write documentation" },
};

const Kanban = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [columns, setColumns] = useState(initialTasks);
  const [tasks, setTasks] = useState(initialTaskDetails);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // If there is no destination or if the item is dropped in the same place
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    // If moving within the same column
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newColumns = {
        ...columns,
        [newColumn.id]: newColumn,
      };

      setColumns(newColumns);
      return;
    }

    // Moving from one column to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newColumns = {
      ...columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    };

    setColumns(newColumns);
  };

  return (
    <Box m="20px">
      <Header title="KANBAN" subtitle="Manage your tasks with Kanban board" />
      <DragDropContext onDragEnd={onDragEnd}>
        <Box
          display="grid"
          gridTemplateColumns="repeat(3, 1fr)"
          gap="20px"
          sx={{ overflowX: "auto" }}
        >
          {Object.values(columns).map((column) => (
            <Box
              key={column.id}
              backgroundColor={colors.primary[400]}
              p="15px"
              borderRadius="4px"
              minHeight="500px"
            >
              <Typography
                variant="h5"
                color={colors.grey[100]}
                fontWeight="600"
                mb="15px"
              >
                {column.title}
              </Typography>
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <Box
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    sx={{
                      background: snapshot.isDraggingOver
                        ? colors.primary[500]
                        : colors.primary[400],
                      padding: "8px",
                      minHeight: "100px",
                      transition: "background-color 0.2s ease",
                    }}
                  >
                    {column.taskIds.map((taskId, index) => {
                      const task = tasks[taskId];
                      return (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <Box
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              sx={{
                                userSelect: "none",
                                padding: "16px",
                                margin: "0 0 8px 0",
                                backgroundColor: snapshot.isDragging
                                  ? colors.blueAccent[700]
                                  : colors.primary[500],
                                color: colors.grey[100],
                                borderRadius: "3px",
                                boxShadow: snapshot.isDragging
                                  ? "0 5px 10px rgba(0, 0, 0, 0.6)"
                                  : "none",
                              }}
                            >
                              {task.content}
                            </Box>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </Box>
          ))}
        </Box>
      </DragDropContext>
    </Box>
  );
};

export default Kanban; 