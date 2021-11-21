import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import { Slider } from "@mui/material";
import Database from "./Database";


export default function Controls() {
  const [fetchData, setFetchData] = useState([]);
  const [mainData, setMainData] = useState([]);
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillsAtSearch, setSkillsAtSearch] = useState([]);



  useEffect(()=> {
    axios
      .post("https://dev.weekday.technology/adhoc/candidateSearchAssignment")
      .then((response) => {
        var d = [];
        var skillData = []
        response.data.list.map((x) =>{
          var item= x;
          var entity = item;
          entity["rawData"] = JSON.parse(item["rawData"]);
          item.rawData.map((element)=>{
            d.push(element);
            
          
          })
        })

        setMainData(d);
        setFetchData(d);

        d.map((ele)=>{
          for(var i=0; i < ele.skills.length; i++)
          skillData.push(ele.skills[i])
        });
        var skillData1 = [...new Set(skillData)]
          setSkills(skillData1.sort());

      })
      .catch((e)=>{
        console.log("Error", e);
      });
  }, []);
 
 
  const handleFilterClick = () => { 
    let filter = [...fetchData];
    var i;
    if (experience) {
      // console.log(experience);
      for (i = 0; i < filter.length; i++) {
        let item = filter[i];
        if (item["inferred_years_experience"] < parseInt(experience)) {
          filter.splice(i, 1);
          i--;
        }
      }
    }
  
      // console.log(filter);
      if (skillsAtSearch.length > 0) {
        let newData = [];
        for (i = 0; i < filter.length; i++) {
          let test = filter[i];
          for (var j = 0; j < skillsAtSearch.length; j++) {
            if (test["skills"].indexOf(skillsAtSearch[j]) > -1) {
              newData.push(test);
              break;
            }
          }
        }
        filter = newData;
      }

  setMainData(filter);
  
  };

  const handleClearFilters = () => {
    setMainData(fetchData);
    setExperience("");
    setSkillsAtSearch([]);
  };

  const handleSkillsChange = (event) => {
    const {
      target: { value },
    } = event;
    setSkillsAtSearch(typeof value === "string" ? value.split(",") : value);
  };


  // console.log(fetchData)
  return (
    <div className="px-2 pt-4 w-full">
      <div className="flex flex-row w-full items-center">
      <div className="w-1/4 pr-2">
          <FormControl fullWidth>
            <InputLabel id="skills">Skill</InputLabel>
            <Select
              sx={{ borderRadius: 0 }}
              size="small"
              labelId="skills"
              id="skills"
              multiple
              value={skillsAtSearch}
              onChange={handleSkillsChange}
              input={<OutlinedInput label="Skills" />}
              renderValue={(selected) => selected.join(", ")}
            >
              {skills.map((obj) => (
                <MenuItem key={obj} value={obj}>
                  <Checkbox checked={skillsAtSearch.indexOf(obj) > -1} />
                  <ListItemText primary={obj} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="w-1/4 pr-8 pl-4" >

          <FormControl fullWidth>
          <TextField type="number" id="standard-basic" label="Min Experience" value={experience} variant="standard" onChange={(e) => {
                setExperience(e.target.value);
              }}/>
          </FormControl>
          {/* <Slider
                aria-label="Temperature"
                defaultValue={3}
                // getAriaValueText={experience}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={10}
                value={experience}
                onChange={(e) => {
                  setExperience(e.target.value);
                }}
              /> */}
        </div>
        
        <div className="w-1/4 flex flex-row">
          <div className="pr-2">
            <Button
              variant="contained"
              sx={{ borderRadius: 0 }}
              onClick={handleFilterClick}
            >
              Filter
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              sx={{ borderRadius: 0 }}
              onClick={handleClearFilters}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </div>
      <div className="pt-4">
      <Database mData={mainData}/>
      </div>
    </div>
  );
}
