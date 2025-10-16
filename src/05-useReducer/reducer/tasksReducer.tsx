import * as z from "zod";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskState {
  todos: Todo[];
  lenght: number;
  completed: number;
  pending: number;
}

export type TaskAction =
  | { type: "ADD_TODO"; payload: string }
  | { type: "TOGGLE_TODO"; payload: number }
  | { type: "DELETE_TODO"; payload: number };

const TodoSchema = z.object({
  id: z.number,
  text: z.string(),
  completed: z.boolean,
});

const TaskStateSchema = z.object({
  todos: z.array(TodoSchema),
  lenght: z.number(),
  completed: z.number(),
  pending: z.number(),
});

export const getTaskInitialState = (): TaskState => {
  const localstorage = localStorage.getItem("tasks-state");

  if (!localstorage) {
    return {
      todos: [],
      lenght: 0,
      completed: 0,
      pending: 0,
    };
  }

  //Validar mediante Zod
  const resultado = TaskStateSchema.safeParse(JSON.parse(localstorage));

  if (resultado.error) {
    console.log(resultado.error);
    return {
      todos: [],
      lenght: 0,
      completed: 0,
      pending: 0,
    };
  }

  return JSON.parse(localstorage);
};

export const taskReducer = (
  state: TaskState,
  action: TaskAction
): TaskState => {
  switch (action.type) {
    case "ADD_TODO": {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload.trim(),
        completed: false,
      };

      return {
        ...state,
        todos: [...state.todos, newTodo],
        lenght: state.todos.length + 1,
        pending: state.pending + 1,
      };
    }

    case "TOGGLE_TODO": {
      const updateTodo = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      return {
        ...state,
        todos: updateTodo,
        completed: updateTodo.filter((todo) => todo.completed).length,
        pending: updateTodo.filter((todo) => !todo.completed).length,
      };
    }

    case "DELETE_TODO": {
      const updateTodo = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      return {
        ...state,
        todos: updateTodo,
        lenght: updateTodo.length,
        completed: updateTodo.filter((todo) => todo.completed).length,
        pending: updateTodo.filter((todo) => !todo.completed).length,
      };
    }

    default:
      return state;
  }
};
