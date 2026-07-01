import api from './axiosInstance';

export const getTodos   = ()         => api.get('/todos');
export const createTodo = (data)     => api.post('/todos', data);
export const updateTodo = (id, data) => api.put(`/todos/${id}`, data);
export const deleteTodo = (id)       => api.delete(`/todos/${id}`);