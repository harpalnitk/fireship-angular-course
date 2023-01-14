export interface Board {
    // id wont exist if we first add data to database 
    id?: string;
    title?: string;
    priority?: number;
    tasks?: Task[];
    uid?: string;
  }
  
  export interface Task {
    description?: string;
    label?: 'purple' | 'blue' | 'green' | 'yellow' | 'red' | 'gray';
  }
  