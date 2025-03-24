import React, { useState } from 'react';
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { motion } from 'framer-motion';

const HrModule = () => {
  const [jobRole, setJobRole] = useState('');
  const [jobRequirements, setJobRequirements] = useState('');
  const [jd, setJd] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sendMeetingLink, setSendMeetingLink] = useState(false);
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingStartTime, setMeetingStartTime] = useState('');
  const [meetingEndTime, setMeetingEndTime] = useState('');
  const [numberOfPersons, setNumberOfPersons] = useState(1); // New state for number of persons

  // Time options for Start Time
  const startTimeOptions = [
    '12:00am', '12:15am', '12:30am', '12:45am',
    '1:00am', '1:15am', '1:30am', '1:45am',
    '2:00am', '2:15am', '2:30am', '2:45am',
    '3:00am', '3:15am', '3:30am', '3:45am',
    '4:00am', '4:15am', '4:30am', '4:45am',
    '5:00am', '5:15am', '5:30am', '5:45am',
    '6:00am', '6:15am', '6:30am', '6:45am',
    '7:00am', '7:15am', '7:30am', '7:45am',
    '8:00am', '8:15am', '8:30am', '8:45am',
    '9:00am', '9:15am', '9:30am', '9:45am',
    '10:00am', '10:15am', '10:30am', '10:45am',
    '11:00am', '11:15am', '11:30am', '11:45am',
    '12:00pm', '12:15pm', '12:30pm', '12:45pm',
    '1:00pm', '1:15pm', '1:30pm', '1:45pm',
    '2:00pm', '2:15pm', '2:30pm', '2:45pm',
    '3:00pm', '3:15pm', '3:30pm', '3:45pm',
    '4:00pm', '4:15pm', '4:30pm', '4:45pm',
    '5:00pm', '5:15pm', '5:30pm', '5:45pm',
    '6:00pm', '6:15pm', '6:30pm', '6:45pm',
    '7:00pm', '7:15pm', '7:30pm', '7:45pm',
    '8:00pm', '8:15pm', '8:30pm', '8:45pm',
    '9:00pm', '9:15pm', '9:30pm', '9:45pm',
    '10:00pm', '10:15pm', '10:30pm', '10:45pm',
    '11:00pm', '11:15pm', '11:30pm', '11:45pm',
  ];

  // Time options for End Time (based on Start Time)
  const getEndTimeOptions = (startTime) => {
    const startIndex = startTimeOptions.indexOf(startTime);
    if (startIndex === -1) return [];
    return startTimeOptions.slice(startIndex + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Job Role:', jobRole);
    console.log('Job Requirements:', jobRequirements);
    console.log('Job Description:', jd);
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
    console.log('Number of Persons to Select:', numberOfPersons);
    console.log('Send Meeting Link:', sendMeetingLink);
    if (sendMeetingLink) {
      console.log('Meeting Date:', meetingDate);
      console.log('Meeting Start Time:', meetingStartTime);
      console.log('Meeting End Time:', meetingEndTime);
    }
    // Add your logic to process the form data here
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100"
    >
      <Paper elevation={3} className="w-full max-w-2xl p-8 rounded-lg">
        {/* Heading */}
        <Typography variant="h4" align="center" className="font-bold text-purple-700 mb-8">
          HRAgent
        </Typography>

        {/* Job Role */}
        <TextField
          label="Job Role"
          fullWidth
          variant="outlined"
          margin="normal"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
          className="mb-6"
        />

        {/* Job Requirements */}
        <TextField
          label="Job Requirements"
          fullWidth
          variant="outlined"
          margin="normal"
          value={jobRequirements}
          onChange={(e) => setJobRequirements(e.target.value)}
          className="mb-6"
        />

        {/* Job Description */}
        <TextField
          label="Job Description"
          multiline
          rows={6}
          fullWidth
          variant="outlined"
          margin="normal"
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          className="mb-6"
        />

        {/* Date Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <TextField
            label="Start Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            variant="outlined"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <TextField
            label="End Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            variant="outlined"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {/* Number of Persons to Select */}
        <TextField
          label="Number of Persons to Select"
          type="number"
          fullWidth
          variant="outlined"
          margin="normal"
          value={numberOfPersons}
          onChange={(e) => setNumberOfPersons(e.target.value)}
          className="mb-6"
          inputProps={{ min: 1 }} // Ensure the value is at least 1
        />

        {/* Want to Send Meeting Link */}
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={sendMeetingLink}
              onChange={(e) => setSendMeetingLink(e.target.checked)}
            />
          }
          label="Want to send meeting link?"
          className="mb-6"
        />

        {/* Meeting Details (Conditional) */}
        {sendMeetingLink && (
          <div className="space-y-6">
            <TextField
              label="Meeting Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              variant="outlined"
              value={meetingDate}
              onChange={(e) => setMeetingDate(e.target.value)}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormControl fullWidth variant="outlined">
                <InputLabel>Start Time</InputLabel>
                <Select
                  value={meetingStartTime}
                  onChange={(e) => setMeetingStartTime(e.target.value)}
                  label="Start Time"
                >
                  {startTimeOptions.map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth variant="outlined">
                <InputLabel>End Time</InputLabel>
                <Select
                  value={meetingEndTime}
                  onChange={(e) => setMeetingEndTime(e.target.value)}
                  label="End Time"
                  disabled={!meetingStartTime}
                >
                  {getEndTimeOptions(meetingStartTime).map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        )}

        {/* Gap between time dropdowns and submit button */}
        <div className="mt-8">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            startIcon={<SendIcon />}
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-700 transition-colors duration-300"
          >
            Submit
          </Button>
        </div>
      </Paper>
    </motion.div>
  );
};

export  {HrModule};