import React, {Component} from 'react';
import { Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import uuid from 'uuid';

class ShoppingList extends Component{

    state = {
        items: [
            { id: uuid(), name: 'Eggs' },
            { id: uuid(), name: 'Milk' },
            { id: uuid(), name: 'Steak' },
            { id: uuid(), name: 'Water' },
        ]
    }

    render(){
        const {items} = this.state;
        return(
            <Container>
                <Button
                  color="dark"
                  style={{marginBottom: '2rem'}}
                  onClick={() => {
                    const name = prompt('Enter Item');
                    if(name){
                        this.setState(state => 
                            ({items : [...state.items, {id:uuid(), name:name}]}));
                    }
                  }}
                >
                    Add Item
                </Button>

                <ListGroup>
                    <TransitionGroup className="shoppong-list">
                        {items.map(({id, name}) => {
                           return <CSSTransition  key={id} timeout={500} classNames="fade">
                              <ListGroupItem>
                              <Button
                                 color="danger"
                                 size="sm"
                                 className="mr-2"
                                 onClick = { () => {
                                    const filteredItems = items.filter( item => item.id !== id);
                                    this.setState({items: filteredItems});
                                 }}                                                                     
                              >
                                 &times;
                              </Button>   
                               {name}
                              </ListGroupItem> 
                            </CSSTransition>
                        })}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

export default ShoppingList;