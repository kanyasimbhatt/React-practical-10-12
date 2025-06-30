import { ActionDispatch, createContext, useContext, useReducer } from "react";
import { Task } from "../Types/Tasks/types";

type GeneralType = {
  tasks: Task[];
  darkMode: boolean;
};

const initialState: GeneralType = {
  tasks: JSON.parse(localStorage.getItem("tasks-array") as string) || [],
  darkMode: true,
};

type ActionType = "MODIFY_MODE" | "MODIFY_TASKS";

type ReducerType = {
  type: ActionType;
  payload: Task[] | boolean;
};

const reducer = (state: GeneralType, action: ReducerType): GeneralType => {
  if (action.type === "MODIFY_MODE") {
    return { ...state, darkMode: action.payload as boolean };
  } else if (action.type === "MODIFY_TASKS") {
    localStorage.setItem("tasks-array", JSON.stringify(action.payload));
    return { ...state, tasks: action.payload as Task[] };
  }

  return state;
};

type ContextReducerType = {
  generalData: GeneralType;
  dispatch: ActionDispatch<[action: ReducerType]>;
};

const GeneralContext = createContext<ContextReducerType | null>(null);

type ChildrenType = {
  children: React.ReactNode;
};

const GeneralProvider = ({ children }: ChildrenType) => {
  const [generalData, dispatch] = useReducer(reducer, initialState);

  return (
    <GeneralContext.Provider value={{ generalData, dispatch }}>
      {children}
    </GeneralContext.Provider>
  );
};

export const useGeneral = () => {
  const context = useContext(GeneralContext);

  if (!context) {
    throw new Error("was not able to fetch context");
  }

  return context;
};

export default GeneralProvider;
