/* interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskState {
  todos: Todo[];
  length: number;
  completed: number;
  pending: number;
}

export type TaskAction = { type : 'ADD_TODO', payload: string } | { type : 'TOGGLE_TODO', payload: number } | { type : 'DELETE_TODO', payload: number }

export const taskReducer = (state: TaskState, action: TaskAction ): TaskState => {

  switch (action.type) {
    case 'ADD_TODO': {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload.trim(),
        completed: false,
      };

      return {
        ...state,
        todos: [...state.todos, newTodo],
        length : state.length + 1,
        pending : state.pending + 1,
      };
    }
      
    case 'TOGGLE_TODO':{
      const updateTodos = state.todos.map( todo => {
        if( todo.id === action.payload ) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });

      return {
        ...state,
        todos: updateTodos,
        pending : updateTodos ? state.pending - 1 : state.pending + 1,
        completed : updateTodos ? state.completed + 1 : state.completed - 1,
      };
    }
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter( todo => todo.id !== action.payload ),
        length : state.length - 1,
        completed : state.todos.find( todo => todo.id === action.payload )?.completed ? state.completed - 1 : state.completed,
        pending : state.todos.find( todo => todo.id === action.payload )?.completed ? state.pending : state.pending - 1,
      };
    default:
      return state;
  }
}
 */