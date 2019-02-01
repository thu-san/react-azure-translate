import React, { PureComponent } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'typeface-roboto';
import { AppBar, Toolbar, Typography, TextField } from '@material-ui/core';
import Button, { ButtonProps } from '@material-ui/core/Button';

import styled from './sc';

export class App extends PureComponent {
  render() {
    return (
      <>
        <CssBaseline />
        <AppBar position="sticky" color="default">
          <Toolbar>
            <Typography variant="h6" color="default">
              Azure Translate
            </Typography>
          </Toolbar>
        </AppBar>
        <TextField
          required
          id="filled-required"
          label="Required"
          defaultValue="Hello World"
          margin="normal"
          variant="filled"
        />
        <Button>Default</Button>
        <Haha>wasafa</Haha>
        <But size="large" />
        <div style={{ height: 2000 }}>Hello</div>
      </>
    );
  }
}

export default App;

const Haha = styled('h1')<{ children: string }>`
  background: red;
`;

const But = styled(Button)`
  background: blue;
`;
