// Module imports
import fetch from 'isomorphic-fetch'





// Component imports
import actionTypes from '../actionTypes'





export const createRat = (name, platform, userId) => async dispatch => {
  try {
    dispatch({
      type: actionTypes.CREATE_RAT,
    })

    let response = await fetch(`/api/rats`, {
      body: JSON.stringify({
        name,
        platform,
        userId
      }),
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      }),
      method: 'post'
    })

    response = await response.json()

    dispatch({
      rat: response.data,
      status: 'success',
      type: actionTypes.CREATE_RAT,
    })

  } catch (error) {
    dispatch({
      rat: ratId,
      status: 'error',
      type: actionTypes.CREATE_RAT,
    })

    console.log(error)
  }
}





export const getRats = ratIds => async dispatch => {
  for (let ratId of ratIds) {
    try {
      dispatch({
        rat: ratId,
        type: actionTypes.GET_RAT,
      })

      let response = await fetch(`/api/rats/${ratId}`)
      response = await response.json()

      dispatch({
        rat: response.data,
        status: 'success',
        type: actionTypes.GET_RAT,
      })

    } catch (error) {
      dispatch({
        rat: ratId,
        status: 'error',
        type: actionTypes.GET_RAT,
      })

      console.log(error)
    }
  }
}
