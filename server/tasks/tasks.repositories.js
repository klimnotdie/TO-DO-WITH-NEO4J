import { getDriver } from '../neo4j.js'

function formatNeoResponse(respone) {
  const formattedRes = respone.records.map((record) => ({
    id: record.get('t').identity.low,
    ...record.get('t').properties,
  }))
  return formattedRes
}

export async function getAllTasks() {
  const driver = getDriver()
  try {
    const session = driver.session()
    const result = await session.run('MATCH (t:Tasks) RETURN t')
    await session.close()
    return formatNeoResponse(result)
  } catch (err) {
    return err
  }
}

export async function createOneTask(title) {
  const driver = getDriver()
  try {
    const session = driver.session()
    const result = await session.run('CREATE (t:Tasks {title: $title, status: "progress"}) RETURN t', { title })
    await session.close()
    return formatNeoResponse(result)
  } catch (err) {
    return err
  }
}

export async function deleteOneTask(id) {
  try {
    const driver = getDriver()
    const session = driver.session()
    const task = await session.run('MATCH (t:Tasks) WHERE id(t) = $id DELETE t', {
      id: parseInt(id),
    })
    await session.close()
    return task
  } catch (err) {
    return err
  }
}

export async function updateOneTask({ id, status }) {
  try {
    const driver = getDriver()
    const session = driver.session()
    const task = await session.run('MATCH (t:Tasks) WHERE id(t) = $id SET t.status = $status RETURN t', { id: parseInt(id), status: status })
    await session.close()
    return task
  } catch (err) {
    return err
  }
}
