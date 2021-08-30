import {useState, useEffect} from 'react'

const creds = {
  clientId: process.env.REACT_APP_CLIENT_ID,
  apiKey: process.env.REACT_APP_API_KEY,
  scope: 'https://www.googleapis.com/auth/calendar',
  discoveryDocs: [
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
  ],
}

const useAuth = () => {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [isGapiLoaded, setIsGapiLoaded] = useState(false)
  const [auth, setAuth] = useState(null)

  window.onGapiLoaded = () => {
    setIsGapiLoaded(true)
  }
  // initialize auth
  useEffect(() => {
    window.gapi.load('client:auth2', (_) => {
      window.gapi?.client
        ?.init(creds)
        .then(() => {
          const authInstance = window.gapi.auth2.getAuthInstance()
          setIsSignedIn(authInstance.isSignedIn.get())
          setAuth(authInstance)
        })
        .catch((err) => console.log(err))
    })
  }, [isGapiLoaded])

  // brings out the signin popup and signs the user in
  const handleSignIn = () => {
    auth.signIn().then(() => setIsSignedIn(true))
  }

  return [isSignedIn, handleSignIn]
}

export default useAuth
