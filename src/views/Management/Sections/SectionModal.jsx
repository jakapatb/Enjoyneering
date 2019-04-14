import React, { Component } from 'react'
import Modal from "components/Modal/Modal";

export class SectionModal extends Component {
  static propTypes = {

  }

  render() {
    return (
      <Modal
        isOpen={modal}
        title={"Promote Members"}
        content={
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              {content.hasModal ? (
                content.modal.available ? (
                  <h3>{content.modal.promoteStatus.password}</h3>
                ) : (
                  <Button onClick={this.handleGenPass}>
                    generate Password
                  </Button>
                )
              ) : (
                <h2>Loading...</h2>
              )}
            </GridItem>
          </GridContainer>
        }
        handleModal={this.handleModal}
        submit={() => this.handleGenPass()}
      />
    );
  }
}

export default SectionModal
