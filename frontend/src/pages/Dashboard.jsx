import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../api/todos';

const EMPTY_FORM = { title: '', description: '', priority: 'medium', due_date: '' };

export default function Dashboard() {
  const { user, logout }      = useAuth();
  const [todos, setTodos]     = useState([]);
  const [form, setForm]       = useState(EMPTY_FORM);
  const [editId, setEditId]   = useState(null);
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchTodos(); }, []);

  async function fetchTodos() {
    try {
      const res = await getTodos();
      setTodos(res.data.todos);
    } catch {
      setError('Failed to load todos');
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      if (editId) {
        const res = await updateTodo(editId, form);
        setTodos(todos.map((t) => (t.id === editId ? res.data.todo : t)));
        setEditId(null);
      } else {
        const res = await createTodo(form);
        setTodos([res.data.todo, ...todos]);
      }
      setForm(EMPTY_FORM);
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.msg
               || err.response?.data?.message
               || 'Something went wrong';
      setError(msg);
    }
  }

  async function handleToggle(todo) {
    try {
      const res = await updateTodo(todo.id, { is_done: !todo.is_done });
      setTodos(todos.map((t) => (t.id === todo.id ? res.data.todo : t)));
    } catch {
      setError('Failed to update todo');
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this todo?')) return;
    try {
      await deleteTodo(id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch {
      setError('Failed to delete todo');
    }
  }

  function startEdit(todo) {
    setEditId(todo.id);
    setForm({
      title:       todo.title,
      description: todo.description || '',
      priority:    todo.priority,
      due_date:    todo.due_date ? todo.due_date.split('T')[0] : ''
    });
  }

  function cancelEdit() {
    setEditId(null);
    setForm(EMPTY_FORM);
  }

  const priorityColour = { low: '#4caf50', medium: '#ff9800', high: '#f44336' };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>My Todos</h1>
        <div className="header-right">
          <span>Hi, {user?.username}</span>
          <button className="btn-logout" onClick={logout}>Logout</button>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="todo-form-section">
          <h2>{editId ? 'Edit Todo' : 'New Todo'}</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit} className="todo-form">
            <input name="title" placeholder="Title *" value={form.title} onChange={handleChange} required />
            <input name="description" placeholder="Description (optional)" value={form.description} onChange={handleChange} />
            <select name="priority" value={form.priority} onChange={handleChange}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <input type="date" name="due_date" value={form.due_date} onChange={handleChange} />
            <div className="form-actions">
              <button type="submit">{editId ? 'Save Changes' : 'Add Todo'}</button>
              {editId && <button type="button" onClick={cancelEdit}>Cancel</button>}
            </div>
          </form>
        </section>

        <section className="todo-list-section">
          {loading && <p>Loading...</p>}
          {!loading && todos.length === 0 && <p className="empty">No todos yet. Add one above!</p>}
          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo.id} className={`todo-item ${todo.is_done ? 'done' : ''}`}>
                <input type="checkbox" checked={todo.is_done} onChange={() => handleToggle(todo)} />
                <div className="todo-body">
                  <span className="todo-title">{todo.title}</span>
                  {todo.description && <span className="todo-desc">{todo.description}</span>}
                  <div className="todo-meta">
                    <span className="priority-badge" style={{ background: priorityColour[todo.priority] }}>
                      {todo.priority}
                    </span>
                    {todo.due_date && (
                      <span className="due-date">Due: {new Date(todo.due_date).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
                <div className="todo-actions">
                  <button onClick={() => startEdit(todo)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(todo.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}