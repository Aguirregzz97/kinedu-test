import { authToken } from "./Constants";

export async function getActivities() {
  try {
    const response = await fetch('http://demo.kinedu.com/api/v3/babies/1/activity_plans/current', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${authToken}`,
      }
    })
    const res = await response.json()
    return res
  } 
  catch (error) {
    return error
  }
}