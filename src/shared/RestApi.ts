import { authToken } from './Constants'
import { ActivityPlan } from './Types'

interface IActivityPlansResponseData {
  data: IActivityPlanData
}

interface IActivityPlanData {
  activity_plan: ActivityPlan
}

export async function getActivities() : Promise<ActivityPlan> {
  try {
    const response = await fetch('http://demo.kinedu.com/api/v3/babies/1/activity_plans/current', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${authToken}`,
      }
    })
    const res : IActivityPlansResponseData = await response.json()
    return res.data.activity_plan
  } 
  catch (error) {
    return error
  }
}