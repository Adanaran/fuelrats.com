import actionTypes from '../actionTypes'
import initialState from '../initialState'





export default function (state = initialState.user, action) {
  switch (action.type) {
    case actionTypes.CREATE_RAT:
    case actionTypes.GET_RAT:
      if (action.status === 'success') {
        return Object.assign({}, state, {
          relationships: {
            rats: {
              data: (state.relationships.rats.data || []).concat({
                id: action.rat.id,
                type: 'rats',
              })
            }
          }
        })
      }

    case actionTypes.GET_USER:
      let { payload } = action

      if (payload) {
        let user = Object.assign({}, state, payload.data)

        if (Array.isArray(user.permissions)) {
          user.permissions = new Set(user.permissions)
        }

        // Collect user's permissions
        if (user.relationships.groups.data) {
          user.relationships.groups.data.forEach(({ id, type }) => {
            let group = payload.included.find(entity => (entity.id === id) && (entity.type === type))

            group.attributes.permissions.forEach(permission => user.permissions.add(permission))
          })
        }

        // Generate an Adorable avatar if the user doesn't already have one set
        user.attributes.image = payload.data.attributes.image || `//api.adorable.io/avatars/${payload.data.id}`

        return user
      }

    case actionTypes.LOGOUT:
      switch (action.status) {
        case 'success':
          return Object.assign({}, state, {
            loggedIn: false,
            loggingIn: false,
          })
      }

    case actionTypes.UPDATE_USER:
      if (action.user) {
        let user = action.user

        return Object.assign({}, state, user)
      }

    default:
      return state
  }
}
