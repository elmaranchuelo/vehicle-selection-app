import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Container,
  Typography,
  Divider,
} from '@mui/material';

const MODELS = {
  ford: {
    Ranger: ['Raptor', 'Raptor x', 'wildtrak'],
    Falcon: ['XR6', 'XR6 Turbo', 'XR8'],
    'Falcon Ute': ['XR6', 'XR6 Turbo'],
  },
  bmw: {
    '130d': ['xDrive 26d', 'xDrive 30d'],
    '240i': ['xDrive 30d', 'xDrive , 50d'],
    '320e': ['xDrive , 75d', 'xDrive 80d', 'xDrive 85d'],
  },
  tesla: {
    'Model 3': ['Performance', 'Long Range', 'Dual Motor'],
  },
};

function VehicleForm({ setSubmittedData }) {
  const [make, setMake] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [badge, setBadge] = useState<string>('');
  const [logbook, setLogbook] = useState<File | null>(null);

  const navigate = useNavigate();

  const handleMakeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMake(event.target.value as string);
    setModel('');
    setBadge('');
  };

  const handleModelChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setModel(event.target.value as string);
    setBadge('');
  };

  const handleBadgeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setBadge(event.target.value as string);
  };

  const handleLogbookChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setLogbook(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('make', make);
    formData.append('model', model);
    formData.append('badge', badge);
    if (logbook) {
      formData.append('logbook', logbook);
    }

    try {
      const response = await fetch('http://localhost:3001/submit-form', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Form submission successful:', data);
        setMake('');
        setModel('');
        setBadge('');
        setLogbook(null);

        setSubmittedData(data);
        console.log('Data to be passed:', data);
        navigate('/submitted', { state: { submittedData: data } });
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAutofillButtonClick = (make: string) => {
    if (MODELS[make]) {
      const selectedModel = Object.keys(MODELS[make])[0];
      const selectedBadge = MODELS[make][selectedModel][0];
      setMake(make);
      setModel(selectedModel);
      setBadge(selectedBadge);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Vehicle Selection Form</Typography>

      <form onSubmit={handleSubmit}>
        <Box mt={2} mb={2}>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Make</InputLabel>
            <Select value={make} onChange={handleMakeChange} label="Make">
              <MenuItem value="">
                <em>Select Make</em>
              </MenuItem>
              {Object.keys(MODELS).map((makeOption) => (
                <MenuItem key={makeOption} value={makeOption}>
                  {makeOption}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {make && (
          <Box mt={2} mb={2}>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Model</InputLabel>
              <Select value={model} onChange={handleModelChange} label="Model">
                <MenuItem value="">
                  <em>Select Model</em>
                </MenuItem>
                {MODELS[make] &&
                  Object.keys(MODELS[make]).map((modelOption) => (
                    <MenuItem key={modelOption} value={modelOption}>
                      {modelOption}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
        )}

        {model && (
          <Box mt={2} mb={2}>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Badge</InputLabel>
              <Select value={badge} onChange={handleBadgeChange} label="Badge">
                <MenuItem value="">
                  <em>Select Badge</em>
                </MenuItem>
                {MODELS[make][model] &&
                  MODELS[make][model].map((badgeOption) => (
                    <MenuItem key={badgeOption} value={badgeOption}>
                      {badgeOption}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
        )}

        {badge && (
          <Box mt={2} mb={2}>
            <FormControl fullWidth margin="normal">
              <input type="file" accept=".txt" onChange={handleLogbookChange} />
            </FormControl>
          </Box>
        )}

        <Box mt={2} mb={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Box>
      </form>

      <Divider />

      <Box mt={2} mb={2}>
        <Button
          variant="contained"
          onClick={() => handleAutofillButtonClick('ford')}
          fullWidth
        >
          Ford Ranger Raptor
        </Button>
      </Box>

      <Box mt={2} mb={2}>
        <Button
          variant="contained"
          onClick={() => handleAutofillButtonClick('tesla')}
          fullWidth
        >
          Tesla Model 3 Performance
        </Button>
      </Box>
    </Container>
  );
}

export default VehicleForm;
