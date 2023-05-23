
// reducer types
type Item = {
    id?: string,
    title?: string,
    completed?: boolean,
    e?: React.FormEvent<HTMLFormElement>
}


export type State = Item[]

type ActionWithPayload = {
    type: string,
    payload: Item
}

type ActionWithoutPayload = {
    type: 'HANDLE_DISPLAY_ALL' | 'HANDLE_CLEAR_COMPLETED' //why can't this also accept type string? This is because gibing it a specific type 
    // tells TypeScript that the action with the type 'HANDLE_DISPLAY_ALL' should not have a payload
}

export type ActionType = ActionWithPayload | ActionWithoutPayload

// dispatch function types

export type HandleSubmitType = {
    ( title: string, completed: boolean): void
 }

export type HandleFilter = {
    ( completed: boolean): void
}

export type HandleDisplayAll = {
    (): void
}

export type HandleDelete = {
    (id: string): void
}

export type HandleComplete = {
    (id: string): void
}

export type HandleClearCompleted = {
    (): void
}

//context types

export type ValueProp = {
    // dark mode/ light mode
    theme:string;
    userId: string;
    setUserId: React.Dispatch<React.SetStateAction<string>>;
    setTheme:React.Dispatch<React.SetStateAction<string>>;
    elementWidth: number | null;
    setElementWidth: React.Dispatch<React.SetStateAction<number | null>>;
}

export type ContextProp = {
    children: React.ReactNode
} 

