import { getTasks, createTask, deleteTask, updateTask } from './tasks.controller.js'

export function configureTasksRoutes(app, router) {
  router.get('/tasks', getTasks)
  router.post('/tasks', createTask)
  router.delete('/tasks/:id', deleteTask)
  router.put('/tasks/:id', updateTask)
}
