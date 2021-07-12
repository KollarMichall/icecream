import React, { useEffect, useState, useRef } from 'react'

const LoaderMessage = ({ loadingMessage, isLoading, doneMessage }) => {
    const [showLoadingMessage, setshowLoadingMessage] = useState(false)
    const [showDoneMessage, setShowDoneMessage] = useState(false)
    const isLoadingPreviousValue = useRef(null)

    useEffect(() => {
        let loadingMessageDelay
        let doneMessageDelay

        if (isLoading) {
            loadingMessageDelay = setTimeout(() => {
                setshowLoadingMessage(true)
            }, 400)
        }else{
            if (isLoadingPreviousValue.current) {
                setShowDoneMessage(true)
                doneMessageDelay = setTimeout(() => {
                    setShowDoneMessage(false)
                }, 300)
                
            }
        }
        isLoadingPreviousValue.current = isLoading
        return () => {
            clearTimeout(loadingMessageDelay)
            clearTimeout(doneMessageDelay)
            setshowLoadingMessage(false)
            setShowDoneMessage(false)
        }
    }, [isLoading])

    return (
    <div aria-live="assertive" aria-atomic="true">
        {showLoadingMessage && <p className="loading">{loadingMessage}</p> }
        {showDoneMessage && <p className="visually-hidden">{doneMessage}</p>}
    </div>
    )
}



export default LoaderMessage
