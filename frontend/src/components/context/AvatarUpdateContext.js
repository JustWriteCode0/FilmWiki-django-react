import { React, createContext, useState } from "react"

const AvatarUpdateContext = createContext()

const AvatarUpdateProvider = ({children}) => {
  const [avatarUpdate, setAvatarUpdate] = useState('')

  return(
    <AvatarUpdateContext.Provider value={{ avatarUpdate, setAvatarUpdate}}>
        {/* Context API for update avatar */}
        { children }
    </AvatarUpdateContext.Provider>
  )
}

export {AvatarUpdateContext, AvatarUpdateProvider}