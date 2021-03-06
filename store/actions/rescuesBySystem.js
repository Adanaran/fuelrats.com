// Module imports
import fetch from 'isomorphic-fetch'





// Component imports
import actionTypes from '../actionTypes'





export const getRescuesBySystemStatistics = () => async dispatch => {
  dispatch({ type: actionTypes.GET_RESCUES_BY_SYSTEM })

  try {
    let response = await fetch(`/api/statistics/systems?count.gt=10`, {
      method: 'get',
    })

    response = await response.json()

    dispatch({
      payload: response.data,
      status: 'success',
      type: actionTypes.GET_RESCUES_BY_SYSTEM,
    })

  } catch (error) {
    dispatch({
      status: 'error',
      type: actionTypes.GET_RESCUES_BY_SYSTEM,
    })

    console.log(error)
  }
}
