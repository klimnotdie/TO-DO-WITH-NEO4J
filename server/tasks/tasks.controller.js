import { getAllTasks, createOneTask, deleteOneTask, updateOneTask } from './tasks.repositories.js'

export async function getTasks(req, res, next) {
  try {
    const result = await getAllTasks()
    res.json(result)
  } catch (err) {
    next(err)
  }
}

export async function createTask(req, res, next) {
  const { title } = req.body
  try {
    if (!title) throw new Error('Tittle required')
    const task = await createOneTask(title)
    res.status(201).json(task[0])
  } catch (err) {
    next(err)
  }
}

export async function deleteTask(req, res, next) {
  const { id } = req.params
  try {
    const task = await deleteOneTask(id)
    res.status(200).json({ message: 'Task deleted', taskId: task.summary.query.parameters.id })
  } catch (err) {
    next(err)
  }
}

export async function updateTask(req, res, next) {
  const { id } = req.params
  const { status } = req.body
  try {
    const task = await updateOneTask({ id, status })
    res.status(200).json({ message: 'Task updated', taskId: task.summary.query.parameters.id })
  } catch (err) {
    next(err)
  }
}
