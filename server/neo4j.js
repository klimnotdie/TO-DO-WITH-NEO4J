import neo4j from 'neo4j-driver'

let driver

export async function initDriver(uri, username, password) {
  try {
    console.log(uri, username, password)
    driver = neo4j.driver(uri, neo4j.auth.basic(username, password))
    await driver.verifyConnectivity()
    return driver
  } catch (err) {
    console.log(err)
    return err
  }
}

export function getDriver() {
  return driver
}

export async function closeDriver() {
  if (driver) {
    await driver.close()
  }
}
