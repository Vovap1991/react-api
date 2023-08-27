import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
  };

  stateForm = (value) => {
    const obj = { text: value, id: nanoid() };
    this.setState(prevState => ({
      todos: [...prevState.todos, obj]
    }))
  };
  deleteTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo=>todo.id!==id)
    }))
  }

  render() {
    const { todos } = this.state;
    console.log(this.state.todos)
    return (
      <>
        <SearchForm onSubmit={this.stateForm} />
        <Grid>
          {todos.map((elemment, index) => (
            <GridItem key={elemment.id}>
              <Todo
                elemment={elemment}
                count={index + 1}
                deleteId={this.deleteTodo}
              />
            </GridItem>
          ))}
        </Grid>
      </>
    );
  }
}
