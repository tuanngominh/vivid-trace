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
          set: () => {
            return createPromise(mockScenarioData.mockSuccessCase, mockScenarioData.errorMessage)
          }
        })
      }
    }
  }
}

export default mockFirebaseDatabase