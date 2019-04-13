import React, { Component } from 'react'
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Dashboard from "@material-ui/icons/Dashboard";
import Schedule from "@material-ui/icons/Schedule";
import Loader from "components/Loader/Loader.jsx";
import SectionClass from "./SectionClass";
export class SectionTeacher extends Component {
  render() {
   const {content} = this.props
    return (
      <GridContainer justify="center">
        {content.hasContent ? (<GridItem s={12} sm={12} md={12}>
          <NavPills
            color="rose"
            horizontal={{
              tabsGrid: { s: 12, sm: 2, md: 2 },
              contentGrid: { s: 12, sm: 10, md: 10 }
            }}
            tabs={[
              {
                tabButton: "Dashboard",
                tabIcon: Dashboard,
                tabContent: (
                  <span>
                    <SectionClass/>
                  </span>
                )
              },
              {
                tabButton: "Schedule",
                tabIcon: Schedule,
                tabContent: (
                  <span>
                    <p>
                      Efficiently unleash cross-media information without
                      cross-media value. Quickly maximize timely
                      deliverables for real-time schemas.
                          </p>
                    <br />
                    <p>
                      Dramatically maintain clicks-and-mortar solutions
                      without functional solutions. Dramatically visualize
                      customer directed convergence without revolutionary
                      ROI.
                          </p>
                  </span>
                )
              }
            ]}
          />
        </GridItem>):(
              <Loader/>
          )

         }
        
      </GridContainer>
    )
  }
}
export default SectionTeacher
