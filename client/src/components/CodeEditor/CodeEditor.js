import React, { useState } from 'react'
import Editor from "@monaco-editor/react";
import { codeForCpp, getDefaultCode } from '../../utils/defaultCode';
import axios from 'axios';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Button, makeStyles, Grid, Select, MenuItem } from '@material-ui/core';
import { Table, TableCell, TableContainer, TableHead, TableRow, TextareaAutosize, Typography } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';

const useStyle = makeStyles({
  runBtn: {
    borderRadius: 100, 
    color: '#fff', 
    textTransform: 'none', 
    paddingLeft: 6, 
    paddingRight: 12, 
    paddingTop: 8, 
    paddingBottom: 8,
    fontSize: 13,
    '&:hover': {
      background: 'rgb(227,29,59)', 
    }
  },
  langSelect: {
    border: '0px solid #fff',
    '&:active': {
      border: '0px solid #fff'
    }
  },
  inputTextarea: {
    border: 'none',
    outline: 'none',
    '&:focus': {
      outline: 'none !important',
      border: 'nonegggggg'
    },
    resize: 'none',
    overflowWrap: 'break-word',
    background: 'rgb(33,33,32)',
    color: '#fff',
    fontSize: 17,
    paddingLeft: 5,
    paddingTop: 10,
    '-webkit-box-sizing': 'border-box',
    '-moz-box-sizing': 'border-box',
    boxSizing: 'border-box',
    fontFamily: `'Roboto', 'sans-serif'`,
  }
})

const CodeEditor = () => {
  const classes = useStyle();
  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState(getDefaultCode(language));
  const [inputs, setInputs] = useState('');
  const [defaultCode, setDefaultCode] = useState(getDefaultCode(language)); 
  const [output, setOutput] = useState('')
  const [isFetching, setIsFetching] = useState(false);
  const handleEditorChange = (value, event) => {
    setCode(value);
    console.log(value)
  }
  const handleInputsChange = (e) => {
    setInputs(e.target.value);
  }
  const handleChangeLanguage = (e) => {
    setLanguage(e.target.value);
    setCode(getDefaultCode(e.target.value))
    // console.log(e.target.value)
  }
  const handleClickRun = async() => {
    setIsFetching(true);
    console.log({code,
      language,
      inputs})
    try {
      await axios.post("http://localhost:5000/api/complierun", {
        code,
        language,
        inputs
      }).then(res => {
        setOutput(res.data.output.replaceAll("jdoodle", "untitled"))
        setIsFetching(false);
      }).catch(err => {
        console.log(err);
        setIsFetching(false);
      })
    } catch(error) {
      console.log(error);
      setIsFetching(false);
    }
  }
  console.log(code)
  return (
    <div>
      <div style={{paddingLeft: 12, background: 'rgb(32,32,32)', paddingBottom: 3}}>
        <Grid container>
          <Grid item>
            <Button className={classes.runBtn} onClick={handleClickRun} disable={isFetching} style={{background: isFetching ? 'rgb(109, 10, 25)' : 'rgb(227,29,59)'}}>
              <PlayArrowIcon /> {isFetching ? 'Running' : 'Run'}
            </Button>
          </Grid>
          <Grid item>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={language}
            onChange={handleChangeLanguage}
            label="Age"
            style={{color: '#fff', marginTop: 7, marginLeft: 17, fontSize: 15}}
          >
            <MenuItem value="cpp" style={{background: 'rgb(32,32,32)', color: '#fff', fontSize: 15, paddingTop: 10}}>C++</MenuItem>
            <MenuItem value="java" style={{background: 'rgb(32,32,32)', color: '#fff', fontSize: 15}}>JAVA</MenuItem>
            <MenuItem value="python" style={{background: 'rgb(32,32,32)', color: '#fff', fontSize: 15}}>Python 3</MenuItem>
            <MenuItem value="javascript" style={{background: 'rgb(32,32,32)', color: '#fff', fontSize: 15}}>Javascript</MenuItem>
            <MenuItem value="php" style={{background: 'rgb(32,32,32)', color: '#fff', fontSize: 15, paddingBottom: 10}}>PHP</MenuItem>
          </Select>
          </Grid>
        </Grid>
      </div>
      {/* <button onClick={handleClickRun}>Submit</button> */}
      <div>
        <Grid container>
          <Grid item lg={7} md={7} sm={12} xs={12}>
            <div style={{background: 'rgb(30,30,30)'}}>
              <Editor
                height="100vh"
                defaultLanguage={language}
                defaultValue={defaultCode}
                onChange={handleEditorChange}
                theme="vs-dark"
                value={code}
                language={language}
              />
            </div>
          </Grid>
          <Grid item lg={5} md={5} sm={12} xs={12}>
            <Typography style={{color: '#fff',background: 'rgb(38,39,38)', paddingTop: 15, paddingBottom: 15, paddingLeft: 17}} >
              Input
            </Typography>
            <div style={{height: "40%"}}>
              <TextareaAutosize className={classes.inputTextarea} style={{ height: '100%', width: '100%'}} placeholder="Enter Input" value={inputs} onChange={handleInputsChange} />
            </div>
            <Typography style={{color: '#fff',background: 'rgb(38,39,38)', paddingTop: 15, paddingBottom: 15, paddingLeft: 17}}>
              Output
            </Typography>
            <div style={{height: "60%"}}>
              <TextareaAutosize className={classes.inputTextarea} style={{ height: '100%', width: '100%'}} value={output} readOnly={true}/>
            </div>
          </Grid>
        </Grid>
        
      </div>
      
      
    </div>
  );
}

export default CodeEditor
