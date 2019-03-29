import React, { Component } from 'react'
import GridItem from "components/Grid/GridItem.jsx";
import SectionTable from "./SectionTable";
export class SectionTeacher extends Component {
  render() {
    /**  
    *TODO สร้างเซคของนักเรียน
    *TODO ตอบรับคำร้องจากนักเรียน
    **/
    return (
        <GridItem>
            <h2>Teacher</h2>
            <SectionTable/>
        </GridItem>
    )
  }
}

export default SectionTeacher
