import React from 'react'
import { Link } from 'react-router-dom'

function SignButton() {
  return (
    <div>
        <Link
                to="/signin"
                className="hidden md:block px-4 py-2 font-semibold rounded-md bg-rose-400 hover:bg-bg-rose-500"
              >
                SignIn
              </Link>
    </div>
  )
}

export default SignButton