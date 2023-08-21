import { Todo } from '@/features/todo/type';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://erfhbbmkzrnnamkbfuuw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyZmhiYm1renJubmFta2JmdXV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI1NDgyNjIsImV4cCI6MjAwODEyNDI2Mn0.1muUiYBRfmSkhXnYfEnOfnzpMYIxXbYpTdt6-rsd620',
  {
    auth: {
      persistSession: false, //or true
    },
  }
);

const todoService = {
  async getTodos(query: { search: string | null }) {
    let { data } = await supabase
      .from('todo')
      .select('*')
      .like('todo', `%${query.search}%`)
      .order('id', { ascending: true });

    return data as Todo[];
  },
  async getTodo({ todo }: { todo: string }) {
    let { data } = await supabase
      .from('todo')
      .select('*')
      .eq('todo', todo)
      .maybeSingle();

    return data as Todo;
  },
  async createNewTodo(todo: Partial<Todo>) {
    return supabase.from('todo').insert(todo);
  },
  async updateTodo(todo: Pick<Todo, 'id' | 'todo' | 'isCompleted'>) {
    return supabase.from('todo').update(todo).eq('id', todo.id);
  },
  async removeTodo(todoId: string) {
    return supabase.from('todo').delete().eq('id', todoId);
  },
};

export default todoService;
