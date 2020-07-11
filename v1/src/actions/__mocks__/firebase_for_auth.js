/*
Mock firebase.auth() methods
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

export const mockFirebase = () => {
  return {
    initializeApp: () => {},
    setMockScenarioData: (scenarioData) => {
      mockScenarioData = scenarioData
    },
    auth: () => {
      return {
        verifyPasswordResetCode: (code) => {
          return new Promise(function(resolve, reject){
            if (mockScenarioData.mockSuccessCase) {
              resolve(mockScenarioData.email)
            } else {
              reject({
                message: mockScenarioData.errorMessage
              })  
            }
          })
        },
        sendPasswordResetEmail: (email) => {
          return createPromise(mockScenarioData.mockSuccessCase, mockScenarioData.errorMessage)
        },
        confirmPasswordReset: (code, newPassword) => {
          return createPromise(mockScenarioData.mockSuccessCase, mockScenarioData.errorMessage)
        },
        createUserWithEmailAndPassword: (email, password) => {
          return new Promise(function(resolve, reject){
            if (mockScenarioData.mockSuccessCase) {
              resolve(mockScenarioData.user)
            } else {
              reject({
                message: mockScenarioData.errorMessage
              })  
            }              
          })
        },
        onAuthStateChanged: (nextOrObserver) => {
          if (mockScenarioData.mockSuccessCase) {
            nextOrObserver(mockScenarioData.user)
          } else {
            nextOrObserver()
          }
        },
        signInWithEmailAndPassword: (email, password) => {
          return new Promise(function(resolve, reject){
            if (mockScenarioData.mockSuccessCase) {
              resolve(mockScenarioData.user)
            } else {
              reject({
                message: mockScenarioData.errorMessage
              })  
            }
          })
        },
        signOut: () => {
          return createPromise(mockScenarioData.mockSuccessCase, mockScenarioData.errorMessage)
        }
      }
    }
  }
}