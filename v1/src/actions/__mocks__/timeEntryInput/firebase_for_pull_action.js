/*
Mock firebase.database() methods
*/

/*
 * @success: true : mock success case; false: mock failed case
 * @errorMessage: error message used in failed cae
 */
const createPromise = (success, errorMessage) => {
  return new Promise(function(resolve, reject){
    if (success) {
      resolve()
    } else {
      reject({
        message: errorMessage
      })  
    }              
  })  
}

let mockScenarioData = {
  mockSuccessCase: true
}

const mockFirebaseDatabase = () => {
  return {
    initializeApp: () => {},
    setMockScenarioData: (scenarioData) => {
      mockScenarioData = scenarioData
    },
    database: () => {
      return {
        ref: () => ({
          once: (value, func) => {
            const snapshot = {
              val: () => {
                if (mockScenarioData.mockSuccessCase) {
                  return {
                    text: mockScenarioData.text,
                    startTime: mockScenarioData.startTime
                  }
                } else {
                  return null
                }               
              }
            }
            func(snapshot)
          }
        })
      }
    }
  }
}

export default mockFirebaseDatabase