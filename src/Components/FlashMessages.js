import React, { useEffect } from "react"

function FlashMessages({ messages }) {
  return (
    <div className="floating-alerts">
      {messages.map((msg, index) => {
        return (
          <div key={index} className="flash-message">
            {msg}
          </div>
        )
      })}
    </div>
  )
}

export default FlashMessages
