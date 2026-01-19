import * as z from "zod";

interface Todo {
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

const TodoSchema = z.object({
  id: z.number(),
  text: z.string(),
  completed: z.boolean(),
});

const TastSchema = z.object({
  todos: z.array(TodoSchema),
  length: z.number(),
  completed: z.number(),
  pending: z.number(),
});

export const getInitialTaskState = (): TaskState => {
  const localStorageState = localStorage.getItem('tasksState');

  if ( !localStorageState ) {
    return {
      todos: [],
      length: 0,
      completed: 0,
      pending: 0,
      }
  }

  const result = TastSchema.safeParse( JSON.parse( localStorageState ) );
  if ( result.error ) {
    console.log(result.error);
    return getInitialTaskState();
  }

  return result.data;
  
}

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
        pending : updateTodos.filter( todo => !todo.completed ).length,
        completed : updateTodos.filter( todo => todo.completed ).length,
      };
    }
    case 'DELETE_TODO': {
      const currentTodos = state.todos.filter( todo => todo.id !== action.payload );

      return {
        ...state,
        todos: currentTodos,
        length : currentTodos.length,
        completed : currentTodos.filter( todo => todo.completed ).length,
        pending : currentTodos.filter( todo => !todo.completed ).length,
      };
    }
    default:
      return state;
  }
}
