import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
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
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  ChevronLeft,
  ChevronRight,
  Add as AddIcon,
  Event as EventIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { CalendarEvent } from '../types';
import dayjs, { Dayjs } from 'dayjs';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Team Meeting',
      start: dayjs().add(1, 'day').hour(10).minute(0).toDate(),
      end: dayjs().add(1, 'day').hour(11).minute(0).toDate(),
      description: 'Weekly team sync meeting',
      color: '#1976d2',
    },
    {
      id: '2',
      title: 'Project Deadline',
      start: dayjs().add(3, 'day').hour(9).minute(0).toDate(),
      end: dayjs().add(3, 'day').hour(17).minute(0).toDate(),
      description: 'Final submission for Q1 project',
      color: '#d32f2f',
    },
    {
      id: '3',
      title: 'Client Presentation',
      start: dayjs().add(5, 'day').hour(14).minute(0).toDate(),
      end: dayjs().add(5, 'day').hour(15).minute(30).toDate(),
      description: 'Presentation to stakeholders',
      color: '#2e7d32',
    },
    {
      id: '4',
      title: 'Training Session',
      start: dayjs().add(7, 'day').hour(13).minute(0).toDate(),
      end: dayjs().add(7, 'day').hour(16).minute(0).toDate(),
      description: 'React training for new team members',
      color: '#ed6c02',
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: dayjs().format('YYYY-MM-DD'),
    startTime: '09:00',
    endTime: '10:00',
    color: '#1976d2',
  });

  const monthStart = currentDate.startOf('month');
  const monthEnd = currentDate.endOf('month');
  const calendarStart = monthStart.startOf('week');
  const calendarEnd = monthEnd.endOf('week');

  const getDaysInMonth = () => {
    const days = [];
    let day = calendarStart;

    while (day.isBefore(calendarEnd)) {
      days.push(day);
      day = day.add(1, 'day');
    }

    return days;
  };

  const getEventsForDay = (day: Dayjs) => {
    return events.filter(event => 
      dayjs(event.start).format('YYYY-MM-DD') === day.format('YYYY-MM-DD')
    );
  };

  const getTodayEvents = () => {
    const today = dayjs();
    return events.filter(event => 
      dayjs(event.start).format('YYYY-MM-DD') === today.format('YYYY-MM-DD')
    ).sort((a, b) => dayjs(a.start).diff(dayjs(b.start)));
  };

  const getUpcomingEvents = () => {
    const today = dayjs();
    return events.filter(event => 
      dayjs(event.start).isAfter(today, 'day')
    ).sort((a, b) => dayjs(a.start).diff(dayjs(b.start))).slice(0, 5);
  };

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };

  const handleAddEvent = (selectedDay?: Dayjs) => {
    setSelectedEvent(null);
    setFormData({
      title: '',
      description: '',
      date: selectedDay ? selectedDay.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'),
      startTime: '09:00',
      endTime: '10:00',
      color: '#1976d2',
    });
    setOpenDialog(true);
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      description: event.description || '',
      date: dayjs(event.start).format('YYYY-MM-DD'),
      startTime: dayjs(event.start).format('HH:mm'),
      endTime: dayjs(event.end).format('HH:mm'),
      color: event.color || '#1976d2',
    });
    setOpenDialog(true);
  };

  const handleSaveEvent = () => {
    const startDateTime = dayjs(`${formData.date} ${formData.startTime}`);
    const endDateTime = dayjs(`${formData.date} ${formData.endTime}`);

    const newEvent: CalendarEvent = {
      id: selectedEvent ? selectedEvent.id : Date.now().toString(),
      title: formData.title,
      description: formData.description,
      start: startDateTime.toDate(),
      end: endDateTime.toDate(),
      color: formData.color,
    };

    if (selectedEvent) {
      setEvents(events.map(event => event.id === selectedEvent.id ? newEvent : event));
    } else {
      setEvents([...events, newEvent]);
    }

    handleCloseDialog();
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEvent(null);
    setFormData({
      title: '',
      description: '',
      date: dayjs().format('YYYY-MM-DD'),
      startTime: '09:00',
      endTime: '10:00',
      color: '#1976d2',
    });
  };

  const days = getDaysInMonth();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" fontWeight="bold">
          Calendar
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleAddEvent()}
        >
          Add Event
        </Button>
      </Box>
      <Grid container spacing={3}>
        {/* Calendar Grid */}
        <Grid
          size={{
            xs: 12,
            lg: 8
          }}>
          <Paper sx={{ p: 3 }}>
            {/* Calendar Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <IconButton onClick={handlePrevMonth}>
                <ChevronLeft />
              </IconButton>
              <Typography variant="h5" fontWeight="bold">
                {currentDate.format('MMMM YYYY')}
              </Typography>
              <IconButton onClick={handleNextMonth}>
                <ChevronRight />
              </IconButton>
            </Box>

            {/* Week Days Header */}
            <Grid container sx={{ mb: 1 }}>
              {weekDays.map((day) => (
                <Grid key={day} sx={{ textAlign: 'center', p: 1 }} size="grow">
                  <Typography variant="subtitle2" fontWeight="bold" color="text.secondary">
                    {day}
                  </Typography>
                </Grid>
              ))}
            </Grid>

            {/* Calendar Days */}
            <Grid container>
              {days.map((day, index) => {
                const dayEvents = getEventsForDay(day);
                const isCurrentMonth = day.month() === currentDate.month();
                const isToday = day.isSame(dayjs(), 'day');

                return (
                  <Grid key={index} sx={{ minHeight: 120, p: 0.5 }} size="grow">
                    <Card
                      sx={{
                        height: '100%',
                        minHeight: 110,
                        cursor: 'pointer',
                        backgroundColor: isCurrentMonth ? 'background.paper' : 'action.hover',
                        border: isToday ? '2px solid' : '1px solid',
                        borderColor: isToday ? 'primary.main' : 'divider',
                        '&:hover': {
                          backgroundColor: 'action.hover',
                        },
                      }}
                      onClick={() => handleAddEvent(day)}
                    >
                      <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: isToday ? 'bold' : 'normal',
                            color: isCurrentMonth ? 'text.primary' : 'text.disabled',
                            mb: 1,
                          }}
                        >
                          {day.date()}
                        </Typography>
                        
                        {dayEvents.slice(0, 2).map((event) => (
                          <Chip
                            key={event.id}
                            label={event.title}
                            size="small"
                            sx={{
                              backgroundColor: event.color,
                              color: 'white',
                              fontSize: '0.7rem',
                              height: 18,
                              mb: 0.5,
                              display: 'block',
                              '& .MuiChip-label': {
                                px: 1,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              },
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditEvent(event);
                            }}
                          />
                        ))}
                        
                        {dayEvents.length > 2 && (
                          <Typography variant="caption" color="text.secondary">
                            +{dayEvents.length - 2} more
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Paper>
        </Grid>

        {/* Events Sidebar */}
        <Grid
          size={{
            xs: 12,
            lg: 4
          }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Today's Events */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Today's Events
              </Typography>
              <List>
                {getTodayEvents().length > 0 ? (
                  getTodayEvents().map((event) => (
                    <ListItem key={event.id} sx={{ px: 0 }}>
                      <ListItemIcon>
                        <EventIcon sx={{ color: event.color }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={event.title}
                        secondary={`${dayjs(event.start).format('HH:mm')} - ${dayjs(event.end).format('HH:mm')}`}
                      />
                      <Box>
                        <IconButton size="small" onClick={() => handleEditEvent(event)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" onClick={() => handleDeleteEvent(event.id)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </ListItem>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No events today
                  </Typography>
                )}
              </List>
            </Paper>

            {/* Upcoming Events */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Upcoming Events
              </Typography>
              <List>
                {getUpcomingEvents().map((event) => (
                  <ListItem key={event.id} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <EventIcon sx={{ color: event.color }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={event.title}
                      secondary={dayjs(event.start).format('MMM DD, YYYY HH:mm')}
                    />
                    <Box>
                      <IconButton size="small" onClick={() => handleEditEvent(event)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDeleteEvent(event.id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
        </Grid>
      </Grid>
      {/* Add/Edit Event Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedEvent ? 'Edit Event' : 'Add New Event'}
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
            <TextField
              label="Date"
              type="date"
              fullWidth
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Start Time"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="End Time"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <FormControl fullWidth>
              <InputLabel>Color</InputLabel>
              <Select
                value={formData.color}
                label="Color"
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              >
                <MenuItem value="#1976d2">Blue</MenuItem>
                <MenuItem value="#d32f2f">Red</MenuItem>
                <MenuItem value="#2e7d32">Green</MenuItem>
                <MenuItem value="#ed6c02">Orange</MenuItem>
                <MenuItem value="#9c27b0">Purple</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveEvent} variant="contained">
            {selectedEvent ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Calendar; 