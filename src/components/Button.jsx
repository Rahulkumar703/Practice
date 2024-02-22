import { Loader2 } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

const LoadingButton = ({ children, disabled, ...props }) => {
    return (
        <Button {...props} disabled={disabled}>
            {
                disabled ? <Loader2 className='animate-spin' /> : children
            }
        </Button>
    )
}

export default LoadingButton
