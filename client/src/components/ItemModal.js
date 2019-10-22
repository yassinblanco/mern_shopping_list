import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody,Form , FormGroup, Label, Input } from 'reactstrap';
import {connect} from 'react-redux';
import {addItem} from '../actions/itemActions';


class ItemModal extends Component{

    state = {
        isOpen: false,
        name:''
    }

    toggle = () => {
        this.setState({isOpen: !this.state.isOpen});
    }

    onChangeName = (e) => {
        this.setState({name: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();        
        const newItem = {            
            name: this.state.name
        }        
        this.props.addItem(newItem);
        this.setState({name: ""});
        this.toggle();
    }

    render(){
        return(
          <div>
            <Button
                color="dark"
                style={{marginBottom: '2rem'}}
                onClick={this.toggle}
                >
                    Add Item
            </Button>            
            <Modal isOpen={this.state.isOpen} toggle={this.toggle} >
              <ModalHeader toggle={this.toggle}>Add Item</ModalHeader>
              <ModalBody>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label for="itemname">Item Name</Label>
                        <Input type="text" id="itemname" name="itemname" value={this.state.name} onChange={this.onChangeName}/>
                    </FormGroup>
                    <Button type="submit" color="primary" >Submit</Button> 
                </Form>
              </ModalBody>              
            </Modal>
          </div>
        );
    }
}

export default connect(null,{addItem})(ItemModal);