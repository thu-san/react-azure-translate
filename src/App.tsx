import React, { PureComponent, ChangeEvent } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'typeface-roboto';
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  FormLabel,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import styled from 'styled-components';
import Dropzone, { DropzoneProps } from 'react-dropzone';

import { translateText } from './services/translationService';

interface IState {
  to: 'zh-CN' | 'zh-TW' | 'ko';
  files: File[];
  resultJson?: string;
  converting: boolean;
}
class App extends PureComponent<{}, IState> {
  state: IState = {
    to: 'zh-CN',
    files: [],
    converting: false
  };

  changeLanguage = (e: ChangeEvent<HTMLSelectElement>) =>
    this.setState({ to: e.target.value as 'ko' });

  onDrop: DropzoneProps['onDrop'] = files => this.setState({ files });

  translate = async () => {
    const { to, files } = this.state;
    const result = await readFileAsText(files[0]);

    if (typeof result !== 'string') {
      return alert('File is not in string format');
    }

    this.setState({ converting: true });

    const json = JSON.parse(result);
    for (const key in json) {
      if (json[key] && json[key] !== true) {
        const translatedText = await translateText({
          from: 'ja',
          to,
          text: json[key],
          key: '9002f83874734c5f90c3921ee5c16124'
        });
        console.log(`${json[key]}\n${translatedText}\n-----------`);
        // await sleep();
        json[key] = translatedText;
      }
    }

    this.setState({ resultJson: JSON.stringify(json, null, 2) });

    this.setState({ converting: false });
  };

  render() {
    const { to, files, converting, resultJson } = this.state;

    return (
      <>
        <CssBaseline />
        <AppBar position="sticky" color="default">
          <MiddleContainer>
            <Toolbar>
              <Typography variant="h6" color="default">
                Azure Translate
              </Typography>
            </Toolbar>
          </MiddleContainer>
        </AppBar>
        <MiddleContainer>
          <FormLabel>Please enter Translation Text API Key</FormLabel>
          <TextField
            required={true}
            label="API key"
            margin="normal"
            variant="outlined"
            defaultValue="9002f83874734c5f90c3921ee5c16124"
            style={{ width: '100%' }}
          />
          <FormControl margin="normal" style={{ width: 300 }}>
            <InputLabel htmlFor="age-simple">Translate To</InputLabel>
            <Select
              value={to}
              onChange={this.changeLanguage}
              inputProps={{
                name: 'age',
                id: 'age-simple'
              }}
            >
              <MenuItem value="zh-CN">Chinese (Simplified)</MenuItem>
              <MenuItem value="zh-TW">Chinese (Traditional)</MenuItem>
              <MenuItem value="ko">Korean</MenuItem>
            </Select>
          </FormControl>
          <Dropzone
            multiple={false}
            accept="application/json"
            onDrop={this.onDrop}
          >
            {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
              <Container
                isDragActive={isDragActive}
                isDragReject={isDragReject}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                {}
                {files.length ? (
                  <p>Selected File: {files[0].name}</p>
                ) : isDragReject ? (
                  <p>Cannot drop this file</p>
                ) : (
                  <p>Drop JSON File Here...</p>
                )}
              </Container>
            )}
          </Dropzone>
          <br />
          <Button
            color="primary"
            variant="contained"
            disabled={!files.length || converting}
            onClick={this.translate}
          >
            Convert
          </Button>
          <div>
            <TextField
              label="Result"
              value={resultJson}
              margin="normal"
              variant="outlined"
              multiline={true}
              rows={20}
              style={{ width: '100%' }}
            />
          </div>
        </MiddleContainer>
      </>
    );
  }
}

const MiddleContainer = styled.div`
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;

  & > label {
    margin-top: 15px;
    display: block;
  }
`;

const getColor = (props: { isDragActive: boolean; isDragReject: boolean }) => {
  if (props.isDragReject) {
    return '#c66';
  }
  if (props.isDragActive) {
    return '#6c6';
  }
  return '#666';
};

const Container = styled.div<{ isDragActive: boolean; isDragReject: boolean }>`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-width: 2px;
  border-radius: 5px;
  border-color: ${props => getColor(props)};
  border-style: ${props =>
    props.isDragReject || props.isDragActive ? 'solid' : 'dashed'};
  background-color: ${props =>
    props.isDragReject || props.isDragActive ? '#eee' : ''};

  & > p {
    font-size: 20px;
    color: #888;
    text-align: center;
  }
`;

export default App;

const readFileAsText: (file: File) => Promise<FileReader['result']> = file =>
  new Promise(resolve => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      resolve(fileReader.result);
    };
    fileReader.readAsText(file);
  });

/* const sleep = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 5);
  });
 */
