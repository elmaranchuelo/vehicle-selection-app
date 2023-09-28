import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const SubmittedDataPage: React.FC<{ submittedData?: any }> = ({ submittedData }) => {
  const navigate = useNavigate();

  const dataEntries = submittedData
    ? Object.entries(submittedData).filter(([key]) => key !== 'logbookData')
    : [];

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Submitted Data Page</Typography>
      <List>
        {dataEntries.map(([key, value]) => (
          <ListItem key={key}>
            <ListItemText
              primary={key}
              secondary={value}
            />
          </ListItem>
        ))}
      </List>

      {submittedData?.logbookData && (
        <div>
          <Typography variant="h6">Logbook Data:</Typography>
          <List>
            {submittedData.logbookData.split('\n').map((line, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={line}
                />
              </ListItem>
            ))}
          </List>
        </div>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleGoBack}
        style={{ marginTop: '20px' }}
      >
        Go Back
      </Button>
    </Container>
  );
};

export default SubmittedDataPage;
