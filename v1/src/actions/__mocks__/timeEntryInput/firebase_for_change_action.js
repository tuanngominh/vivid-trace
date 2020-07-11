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
          update: () => (createPromise(mockScenarioData.mockSuccessCase, mockScenarioData.errorMessage))
        })
      }
    }
  }
}

export default mockFirebaseDatabase