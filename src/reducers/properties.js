
export default (state = [], action) => {
    switch (action.type) {
      case 'EXPENSES_LIST_FULFILLED':
        if (!action.payload) {
          return {
            ...state,
            expenses: {count: 0, records: []}
          }
        }
        return {
          ...state,
          expenses: action.payload.data
        }
      case 'EXPENSES_MAX_AMOUNT_FULFILLED':
        return {
          ...state,
          maxAmount: action.payload.data.amount
        }
      case 'EXPENSES_WEEKLY_FULFILLED':
        return {
          ...state,
          weeklyReport: action.payload.data
        }
      default:
        return state
    }
  }
  