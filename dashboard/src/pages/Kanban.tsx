import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Chip,
  Avatar,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { KanbanColumn, KanbanTask } from '../types';

const Kanban: React.FC = () => {
  const [columns, setColumns] = useState<KanbanColumn[]>([
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        {
          id: 'task-1',
          title: 'Design new landing page',
          description: 'Create a modern and responsive landing page design',
          priority: 'high',
          labels: ['Design', 'Frontend'],
          assignee: {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'JD',
            role: 'Designer',
          },
        },
        {
          id: 'task-2',
          title: 'Setup CI/CD pipeline',
          description: 'Configure automated testing and deployment',
          priority: 'medium',
          labels: ['DevOps', 'Backend'],
          assignee: {
            id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            avatar: 'JS',
            role: 'DevOps',
          },
        },
      ],
    },
    {
      id: 'inprogress',
      title: 'In Progress',
      tasks: [
        {
          id: 'task-3',
          title: 'Implement user authentication',
          description: 'Add login and registration functionality',
          priority: 'high',
          labels: ['Backend', 'Security'],
          assignee: {
            id: '3',
            name: 'Mike Johnson',
            email: 'mike@example.com',
            avatar: 'MJ',
            role: 'Developer',
          },
        },
      ],
    },
    {
      id: 'review',
      title: 'Review',
      tasks: [
        {
          id: 'task-4',
          title: 'Code review for API endpoints',
          description: 'Review and test new API implementation',
          priority: 'medium',
          labels: ['Backend', 'Testing'],
          assignee: {
            id: '4',
            name: 'Sarah Wilson',
            email: 'sarah@example.com',
            avatar: 'SW',
            role: 'Lead Developer',
          },
        },
      ],
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [
        {
          id: 'task-5',
          title: 'Database schema design',
          description: 'Design and implement database structure',
          priority: 'low',
          labels: ['Database', 'Backend'],
          assignee: {
            id: '5',
            name: 'David Brown',
            email: 'david@example.com',
            avatar: 'DB',
            role: 'Backend Developer',
          },
        },
      ],
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState<KanbanTask | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    labels: [] as string[],
  });

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = columns.find(col => col.id === source.droppableId)!;
    const destColumn = columns.find(col => col.id === destination.droppableId)!;
    const task = sourceColumn.tasks.find(task => task.id === draggableId)!;

    if (sourceColumn === destColumn) {
      // Moving within same column
      const newTasks = Array.from(sourceColumn.tasks);
      newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, task);

      const newColumn = {
        ...sourceColumn,
        tasks: newTasks,
      };

      setColumns(columns.map(col => col.id === newColumn.id ? newColumn : col));
    } else {
      // Moving between columns
      const sourceTasks = Array.from(sourceColumn.tasks);
      sourceTasks.splice(source.index, 1);

      const destTasks = Array.from(destColumn.tasks);
      destTasks.splice(destination.index, 0, task);

      const newSourceColumn = {
        ...sourceColumn,
        tasks: sourceTasks,
      };

      const newDestColumn = {
        ...destColumn,
        tasks: destTasks,
      };

      setColumns(columns.map(col => {
        if (col.id === newSourceColumn.id) return newSourceColumn;
        if (col.id === newDestColumn.id) return newDestColumn;
        return col;
      }));
    }
  };

  const handleAddTask = (columnId: string) => {
    setSelectedTask(null);
    setSelectedColumn(columnId);
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      labels: [],
    });
    setOpenDialog(true);
  };

  const handleEditTask = (task: KanbanTask, columnId: string) => {
    setSelectedTask(task);
    setSelectedColumn(columnId);
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      labels: task.labels,
    });
    setOpenDialog(true);
  };

  const handleSaveTask = () => {
    const newTask: KanbanTask = selectedTask ? {
      ...selectedTask,
      ...formData,
    } : {
      id: `task-${Date.now()}`,
      ...formData,
      assignee: {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'JD',
        role: 'Developer',
      },
    };

    setColumns(columns.map(col => {
      if (col.id === selectedColumn) {
        if (selectedTask) {
          // Update existing task
          return {
            ...col,
            tasks: col.tasks.map(task => task.id === selectedTask.id ? newTask : task),
          };
        } else {
          // Add new task
          return {
            ...col,
            tasks: [...col.tasks, newTask],
          };
        }
      }
      return col;
    }));

    handleCloseDialog();
  };

  const handleDeleteTask = (taskId: string, columnId: string) => {
    setColumns(columns.map(col => 
      col.id === columnId 
        ? { ...col, tasks: col.tasks.filter(task => task.id !== taskId) }
        : col
    ));
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTask(null);
    setSelectedColumn('');
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      labels: [],
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
        Kanban Board
      </Typography>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Box sx={{ display: 'flex', gap: 3, overflowX: 'auto', pb: 2 }}>
          {columns.map((column) => (
            <Paper
              key={column.id}
              sx={{
                minWidth: 300,
                maxWidth: 300,
                p: 2,
                backgroundColor: 'background.default',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  {column.title} ({column.tasks.length})
                </Typography>
                <Button
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={() => handleAddTask(column.id)}
                >
                  Add
                </Button>
              </Box>

              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      minHeight: 500,
                      backgroundColor: snapshot.isDraggingOver ? 'action.hover' : 'transparent',
                      borderRadius: 1,
                      transition: 'background-color 0.2s ease',
                    }}
                  >
                    {column.tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              mb: 2,
                              cursor: 'grab',
                              transform: snapshot.isDragging ? 'rotate(5deg)' : 'none',
                              boxShadow: snapshot.isDragging ? 4 : 1,
                              '&:active': {
                                cursor: 'grabbing',
                              },
                            }}
                          >
                            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                <Typography variant="subtitle1" fontWeight="medium">
                                  {task.title}
                                </Typography>
                                <Box>
                                  <IconButton
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditTask(task, column.id);
                                    }}
                                  >
                                    <EditIcon fontSize="small" />
                                  </IconButton>
                                  <IconButton
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteTask(task.id, column.id);
                                    }}
                                  >
                                    <DeleteIcon fontSize="small" />
                                  </IconButton>
                                </Box>
                              </Box>
                              
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                {task.description}
                              </Typography>

                              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                                <Chip
                                  label={task.priority}
                                  size="small"
                                  color={getPriorityColor(task.priority) as any}
                                />
                                {task.labels.map((label) => (
                                  <Chip
                                    key={label}
                                    label={label}
                                    size="small"
                                    variant="outlined"
                                  />
                                ))}
                              </Stack>

                              {task.assignee && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                                    {task.assignee.avatar}
                                  </Avatar>
                                  <Typography variant="caption">
                                    {task.assignee.name}
                                  </Typography>
                                </Box>
                              )}
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </Paper>
          ))}
        </Box>
      </DragDropContext>

      {/* Add/Edit Task Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedTask ? 'Edit Task' : 'Add New Task'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Title"
              fullWidth
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={formData.priority}
                label="Priority"
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Labels (comma separated)"
              fullWidth
              value={formData.labels.join(', ')}
              onChange={(e) => setFormData({ 
                ...formData, 
                labels: e.target.value.split(',').map(label => label.trim()).filter(Boolean) 
              })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveTask} variant="contained">
            {selectedTask ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Kanban; 